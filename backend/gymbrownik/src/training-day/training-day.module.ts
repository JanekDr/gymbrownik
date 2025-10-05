import { Module } from '@nestjs/common';
import { TrainingDayService } from './training-day.service';
import { TrainingDayController } from './training-day.controller';
import { DatabaseModule } from 'src/database/database.module';
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [TrainingDayController],
  imports: [DatabaseModule, AuthModule],
  providers: [TrainingDayService],
})
export class TrainingDayModule {}
