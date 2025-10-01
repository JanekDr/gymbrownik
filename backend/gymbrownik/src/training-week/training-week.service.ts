import { Injectable } from '@nestjs/common';
import { CreateTrainingWeekDto } from './dto/create-training-week.dto';
import { UpdateTrainingWeekDto } from './dto/update-training-week.dto';

@Injectable()
export class TrainingWeekService {
  create(createTrainingWeekDto: CreateTrainingWeekDto) {
    return 'This action adds a new trainingWeek';
  }

  findAll() {
    return `This action returns all trainingWeek`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trainingWeek`;
  }

  update(id: number, updateTrainingWeekDto: UpdateTrainingWeekDto) {
    return `This action updates a #${id} trainingWeek`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainingWeek`;
  }
}
