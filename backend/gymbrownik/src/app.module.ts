import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { TrainingModule } from './training/training.module';
import { TrainingPlanModule } from './training-plan/training-plan.module';
import { WorkoutModule } from './workout/workout.module';

@Module({
  imports: [DatabaseModule, UserModule, TrainingModule, TrainingPlanModule, WorkoutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
