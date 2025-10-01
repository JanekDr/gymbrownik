import { IsInt, Min, Max } from 'class-validator';

export class CreateTrainingDayDto {
  @IsInt()
  @Min(1)
  @Max(7)
  dayOfWeek: number; 

  @IsInt()
  trainingWeekId: number;

  @IsInt()
  workoutId: number;
}
