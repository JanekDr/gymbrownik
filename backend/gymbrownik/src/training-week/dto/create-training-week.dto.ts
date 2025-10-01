import { IsInt, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { WorkoutType } from '@prisma/client';

export class CreateTrainingWeekDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(WorkoutType)
  workoutType: WorkoutType;

  @IsInt()
  restDays: number;

  @IsInt()
  trainingDays: number;

  @IsInt()
  userId: number;
}
