import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsInt,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class WorkoutExerciseInput {
  @IsInt()
  exerciseId: number;

  @IsInt()
  series: number;

  @IsInt()
  reps: number;

  @IsNumber()
  weight: number;

  @IsOptional()
  @IsInt()
  rest?: number;
}

export class CreateWorkoutDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutExerciseInput)
  exercises?: WorkoutExerciseInput[];
}
