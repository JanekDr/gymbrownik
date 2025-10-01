import { Module } from '@nestjs/common';
import { TrainingDayService } from './training-day.service';
import { TrainingDayController } from './training-day.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [TrainingDayController],
  imports: [DatabaseModule],
  providers: [TrainingDayService],
})
export class TrainingDayModule {}
