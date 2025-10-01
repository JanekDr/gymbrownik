import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateWorkoutDto, WorkoutExerciseInput } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(private readonly database: DatabaseService) {}

  private async getWorkoutOrThrow(id: number) {
    const workout = await this.database.workout.findUnique({
      where: { id },
      include: {
        exercises: { include: { exercise: true } },
        days: true,
      },
    });
    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }
    return workout;
  }

  async create(dto: CreateWorkoutDto) {
    return this.database.workout.create({
      data: {
        name: dto.name,
        exercises: dto.exercises
          ? {
              create: dto.exercises.map((e: WorkoutExerciseInput) => ({
                series: e.series,
                reps: e.reps,
                weight: e.weight,
                rest: e.rest,
                exercise: { connect: { id: e.exerciseId } },
              })),
            }
          : undefined,
      },
      include: { exercises: { include: { exercise: true } }, days: true },
    });
  }

  async findAll() {
    return this.database.workout.findMany({
      include: { exercises: { include: { exercise: true } }, days: true },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.getWorkoutOrThrow(id);
  }

  async update(id: number, dto: UpdateWorkoutDto) {
    await this.getWorkoutOrThrow(id);

    // na razie tylko zmiana nazwy workoutu
    return this.database.workout.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name }),
      },
      include: { exercises: { include: { exercise: true } }, days: true },
    });
  }

  async remove(id: number) {
    await this.getWorkoutOrThrow(id);
    await this.database.workout.delete({ where: { id } });
    return { message: `Workout with ID ${id} removed` };
  }
}
