import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./user/user.module";
import { TrainingPlanModule } from "./training-plan/training-plan.module";
import { WorkoutModule } from "./workout/workout.module";
import { ExerciseController } from './workout/exercise.controller';
import { ExerciseModule } from './exercise/exercise.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TrainingPlanModule,
    WorkoutModule,
    ExerciseModule,
  ],
  controllers: [AppController, ExerciseController],
  providers: [AppService],
})
export class AppModule {}
