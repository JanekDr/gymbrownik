import { Module } from '@nestjs/common';
import { WorkoutExerciseService } from './workout-exercise.service';
import { WorkoutExerciseController } from './workout-exercise.controller';
import { DatabaseModule } from 'src/database/database.module';
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [WorkoutExerciseController],
  imports: [DatabaseModule, AuthModule],
  providers: [WorkoutExerciseService],
})
export class WorkoutExerciseModule {}
