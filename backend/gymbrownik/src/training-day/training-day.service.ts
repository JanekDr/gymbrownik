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

  async remove(id: number): Promise<void> {
    await this.getTrainingDayOrThrow(id);
    await this.database.trainingDay.delete({ where: { id } });
  }
}
