import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./user/user.module";
import { WorkoutModule } from "./workout/workout.module";
import { ExerciseModule } from './exercise/exercise.module';
import { TrainingWeekModule } from './training-week/training-week.module';
import { TrainingDayModule } from './training-day/training-day.module';
import { WorkoutExerciseModule } from './workout-exercise/workout-exercise.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    WorkoutModule,
    ExerciseModule,
    TrainingWeekModule,
    TrainingDayModule,
    WorkoutExerciseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
