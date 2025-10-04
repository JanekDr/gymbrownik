import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/update-workout-exercise.dto';

@Injectable()
export class WorkoutExerciseService {
  constructor(private readonly database: DatabaseService) {}

  private async getOrThrow(id: number) {
    const exercise = await this.database.workoutExercise.findUnique({
      where: { id },
      include: {
        workout: { select: { id: true, name: true } },
        exercise: { select: { id: true, name: true } },
      },
    });

    if (!exercise)
      throw new NotFoundException(`WorkoutExercise with ID ${id} not found`);

    return exercise;
  }

  async create(dto: CreateWorkoutExerciseDto) {
    return this.database.workoutExercise.create({
      data: {
        series: dto.series,
        reps: dto.reps,
        weight: dto.weight,
        rest: dto.rest,
        history: dto.history ? JSON.parse(JSON.stringify(dto.history)) : [],
        workout: { connect: { id: dto.workoutId } },
        exercise: { connect: { id: dto.exerciseId } },
      },
      include: {
        workout: { select: { id: true, name: true } },
        exercise: { select: { id: true, name: true } },
      },
    });
  }

  async findAll() {
    return this.database.workoutExercise.findMany({
      include: {
        workout: { select: { id: true, name: true } },
        exercise: { select: { id: true, name: true } },
      },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.getOrThrow(id);
  }

  async update(id: number, dto: UpdateWorkoutExerciseDto) {
    await this.getOrThrow(id);

    return this.database.workoutExercise.update({
      where: { id },
      data: {
        ...(dto.series && { series: dto.series }),
        ...(dto.reps && { reps: dto.reps }),
        ...(dto.weight && { weight: dto.weight }),
        ...(dto.rest !== undefined && { rest: dto.rest }),
        ...(dto.history && { history: JSON.parse(JSON.stringify(dto.history)) }),
        ...(dto.workoutId && { workout: { connect: { id: dto.workoutId } } }),
        ...(dto.exerciseId && { exercise: { connect: { id: dto.exerciseId } } }),
      },
      include: {
        workout: { select: { id: true, name: true } },
        exercise: { select: { id: true, name: true } },
      },
    });
  }


  async updateStats(id: number, reps: number, weight: number) {
    const existing = await this.getOrThrow(id);


    const history = Array.isArray(existing.history) ? existing.history : [];

    history.push({
      date: new Date().toISOString(),
      series: existing.series,
      reps: existing.reps,
      weight: Number(existing.weight), 
    });


    return this.database.workoutExercise.update({
      where: { id },
      data: {
        reps,
        weight,
        history,
      },
      include: {
        workout: { select: { id: true, name: true } },
        exercise: { select: { id: true, name: true } },
      },
    });
  }

  async getHistory(id: number) {
  const exercise = await this.getOrThrow(id);

  if (!exercise.history || (Array.isArray(exercise.history) && exercise.history.length === 0)) {
    return {
      message: `No history found for WorkoutExercise with ID ${id}`,
      history: [],
    };
  }

  const sortedHistory = [...(exercise.history as any[])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return {
    exerciseId: exercise.id,
    exerciseName: exercise.exercise.name,
    workoutName: exercise.workout.name,
    totalEntries: sortedHistory.length,
    history: sortedHistory,
  };
}

  async remove(id: number) {
    await this.getOrThrow(id);
    await this.database.workoutExercise.delete({ where: { id } });
    return { message: `WorkoutExercise ${id} deleted` };
  }
}
