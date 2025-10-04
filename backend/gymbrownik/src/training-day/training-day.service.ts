import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTrainingDayDto } from './dto/create-training-day.dto';
import { UpdateTrainingDayDto } from './dto/update-training-day.dto';

@Injectable()
export class TrainingDayService {
  constructor(private readonly database: DatabaseService) {}

  private async getTrainingDayOrThrow(id: number) {
    const td = await this.database.trainingDay.findUnique({
      where: { id },
      include: { trainingWeek: true, workout: true },
    });
    if (td == null) {
      throw new NotFoundException(`TrainingDay with ID ${id} not found`);
    }
    return td;
  }

  async create(dto: CreateTrainingDayDto) {
    return this.database.trainingDay.create({
      data: {
        dayOfWeek: dto.dayOfWeek,
        trainingWeek: { connect: { id: dto.trainingWeekId } },
        workout: { connect: { id: dto.workoutId } },
      },
      include: { trainingWeek: true, workout: true },
    });
  }

  async findAll() {
    return this.database.trainingDay.findMany({
      include: { trainingWeek: true, workout: true },
      orderBy: { dayOfWeek: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.getTrainingDayOrThrow(id);
  }

  async update(id: number, dto: UpdateTrainingDayDto) {
    await this.getTrainingDayOrThrow(id);

    return this.database.trainingDay.update({
      where: { id },
      data: {
        ...(dto.dayOfWeek !== undefined && { dayOfWeek: dto.dayOfWeek }),
        ...(dto.trainingWeekId !== undefined && {
          trainingWeek: { connect: { id: dto.trainingWeekId } },
        }),
        ...(dto.workoutId !== undefined && {
          workout: { connect: { id: dto.workoutId } },
        }),
      },
      include: { trainingWeek: true, workout: true },
    });
  }

async analyzeVolumeBalanceForDay(id: number) {
  const trainingDay = await this.database.trainingDay.findUnique({
    where: { id },
    include: {
      workout: {
        include: {
          exercises: {
            include: {
              exercise: true, 
            },
          },
        },
      },
    },
  });

  if (!trainingDay) {
    throw new NotFoundException(`TrainingDay with ID ${id} not found`);
  }


  const volumeCount: Record<string, number> = {};

  for (const wex of trainingDay.workout.exercises) {
    const part = wex.exercise.bodyPart;
    if (!part) continue; 
    volumeCount[part] = (volumeCount[part] || 0) + wex.series;
  }


  const comparisons = [
    { a: 'CHEST', b: 'BACK' },
    { a: 'HAMSTRINGS', b: 'QUADRICEPS' },
  ];

  const imbalances: {
    comparison: string;
    difference: number;
    weakerPart: string;
    exercises: string[];
  }[] = [];


  for (const pair of comparisons) {
    const seriesA = volumeCount[pair.a] || 0;
    const seriesB = volumeCount[pair.b] || 0;

    const diff = Math.abs(seriesA - seriesB);
    if (diff >= 2) {
      const weaker = seriesA < seriesB ? pair.a : pair.b;
      const weakerExercises = await this.database.exercise.findMany({
        where: { bodyPart: weaker as any },
        select: { name: true },
      });

      imbalances.push({
        comparison: `${pair.a} vs ${pair.b}`,
        difference: diff,
        weakerPart: weaker,
        exercises: weakerExercises.map((e) => e.name),
      });
    }
  }

 
  if (imbalances.length === 0) {
    return {
      trainingDayId: trainingDay.id,
      workoutName: trainingDay.workout.name,
      message: 'No significant imbalances detected for this training day.',
      summary: volumeCount,
    };
  }

  
  return {
    trainingDayId: trainingDay.id,
    workoutName: trainingDay.workout.name,
    message: 'Imbalance detected!',
    summary: volumeCount,
    details: imbalances,
  };
}

  async remove(id: number): Promise<void> {
    await this.getTrainingDayOrThrow(id);
    await this.database.trainingDay.delete({ where: { id } });
  }
}
