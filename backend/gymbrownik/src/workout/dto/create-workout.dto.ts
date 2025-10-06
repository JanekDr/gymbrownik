import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsInt,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WorkoutExerciseInput {
  @ApiProperty({
    description: 'ID of the exercise associated with this workout',
    example: 3,
  })
  @IsInt()
  exerciseId: number;

  @ApiProperty({
    description: 'Number of sets for this exercise',
    example: 4,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  series: number;

  @ApiProperty({
    description: 'Number of repetitions per set',
    example: 10,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  reps: number;

  @ApiProperty({
    description: 'Weight used for the exercise (in kilograms)',
    example: 80.5,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  weight: number;

  @ApiPropertyOptional({
    description: 'Rest time between sets (in seconds)',
    example: 90,
  })
  @IsOptional()
  @IsInt()
  rest?: number;
}

export class CreateWorkoutDto {
  @ApiProperty({
    description: 'Name of the workout',
    example: 'Push Day',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'List of exercises included in the workout',
    type: [WorkoutExerciseInput],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutExerciseInput)
  exercises?: WorkoutExerciseInput[];
}
