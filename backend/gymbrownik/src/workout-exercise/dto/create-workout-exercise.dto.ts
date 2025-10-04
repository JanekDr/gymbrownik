import {
  IsInt,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class SetHistoryDto {
  @IsInt()
  reps: number;

  @IsNumber()
  weight: number;
}

class SessionHistoryDto {
  @IsOptional()
  date?: string; // np. "2025-10-04"

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SetHistoryDto)
  sets: SetHistoryDto[];
}

export class CreateWorkoutExerciseDto {
  @IsInt()
  series: number;

  @IsInt()
  reps: number;

  @IsNumber()
  weight: number;

  @IsOptional()
  @IsInt()
  rest?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SessionHistoryDto)
  history?: SessionHistoryDto[];

  @IsInt()
  workoutId: number;

  @IsInt()
  exerciseId: number;
}
