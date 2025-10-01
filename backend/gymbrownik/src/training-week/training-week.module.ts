import { Module } from '@nestjs/common';
import { TrainingWeekService } from './training-week.service';
import { TrainingWeekController } from './training-week.controller';

@Module({
  controllers: [TrainingWeekController],
  providers: [TrainingWeekService],
})
export class TrainingWeekModule {}
