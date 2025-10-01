import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./user/user.module";
import { TrainingPlanModule } from "./training-plan/training-plan.module";
import { WorkoutModule } from "./workout/workout.module";
import { ExerciseModule } from './exercise/exercise.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TrainingPlanModule,
    WorkoutModule,
    ExerciseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
