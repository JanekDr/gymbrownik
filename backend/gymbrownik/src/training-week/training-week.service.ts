import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTrainingWeekDto } from './dto/create-training-week.dto';
import { UpdateTrainingWeekDto } from './dto/update-training-week.dto';

@Injectable()
export class TrainingWeekService {
  constructor(private readonly database: DatabaseService) {}

  private async getWeekOrThrow(id: number) {
    const week = await this.database.trainingWeek.findUnique({
      where: { id },
      include: { user: true, days: { include: { workout: true } } },
    });
    if (!week) throw new NotFoundException(`TrainingWeek ${id} not found`);
    return week;
  }

  async create(dto: CreateTrainingWeekDto) {
    return this.database.trainingWeek.create({
      data: {
        name: dto.name,
        workoutType: dto.workoutType,
        restDays: dto.restDays,
        trainingDays: dto.trainingDays,
        user: { connect: { id: dto.userId } },
      },
      include: { user: true, days: true },
    });
  }

  async findAll() {
    return this.database.trainingWeek.findMany({
      include: { user: true, days: { include: { workout: true } } },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.getWeekOrThrow(id);
  }

  async update(id: number, dto: UpdateTrainingWeekDto) {
    await this.getWeekOrThrow(id);

    return this.database.trainingWeek.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.workoutType && { workoutType: dto.workoutType }),
        ...(dto.restDays !== undefined && { restDays: dto.restDays }),
        ...(dto.trainingDays !== undefined && { trainingDays: dto.trainingDays }),
        ...(dto.userId && { user: { connect: { id: dto.userId } } }),
      },
      include: { user: true, days: { include: { workout: true } } },
    });
  }

  async remove(id: number) {
    await this.getWeekOrThrow(id);
    await this.database.trainingWeek.delete({ where: { id } });
    return { message: `TrainingWeek ${id} deleted` };
  }
}
