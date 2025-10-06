import {
  IsInt,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsArray,
  Min,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class SetHistoryDto {
  @ApiProperty({
    description: 'Number of repetitions performed in this set',
    example: 10,
  })
  @IsInt()
  @Min(1)
  reps: number;

  @ApiProperty({
    description: 'Weight used for this set (in kilograms)',
    example: 60.5,
  })
  @IsNumber()
  @IsPositive()
  weight: number;
}

class SessionHistoryDto {
  @ApiPropertyOptional({
    description: 'Date of the training session in ISO format (YYYY-MM-DD)',
    example: '2025-10-04',
  })
  @IsOptional()
  date?: string;

  @ApiProperty({
    description: 'List of sets performed during this session',
    type: [SetHistoryDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SetHistoryDto)
  sets: SetHistoryDto[];
}

export class CreateWorkoutExerciseDto {
  @ApiProperty({
    description: 'Number of sets for this exercise',
    example: 4,
  })
  @IsInt()
  @Min(1)
  series: number;

  @ApiProperty({
    description: 'Number of repetitions per set',
    example: 8,
  })
  @IsInt()
  @Min(1)
  reps: number;

  @ApiProperty({
    description: 'Weight used for the exercise (in kilograms)',
    example: 75.5,
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

  @ApiPropertyOptional({
    description:
      'History of previous sessions for this exercise, including performed sets and weights',
    type: [SessionHistoryDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SessionHistoryDto)
  history?: SessionHistoryDto[];

  @ApiProperty({
    description: 'ID of the workout this exercise belongs to',
    example: 2,
  })
  @IsInt()
  workoutId: number;

  @ApiProperty({
    description: 'ID of the exercise being performed',
    example: 5,
  })
  @IsInt()
  exerciseId: number;
}
