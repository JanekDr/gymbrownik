import { Module } from '@nestjs/common';
import { TrainingWeekService } from './training-week.service';
import { TrainingWeekController } from './training-week.controller';
import { DatabaseModule } from 'src/database/database.module';
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [TrainingWeekController],
  imports: [DatabaseModule, AuthModule],
  providers: [TrainingWeekService],
})
export class TrainingWeekModule {}
