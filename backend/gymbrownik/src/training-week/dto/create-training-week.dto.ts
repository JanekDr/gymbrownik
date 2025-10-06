import { IsInt, IsNotEmpty, IsString, IsEnum, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WorkoutType } from '@prisma/client';

export class CreateTrainingWeekDto {
  @ApiProperty({
    description: 'Name of the training week',
    example: 'Push Pull Legs Week 1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Type of workout split for this training week',
    enum: WorkoutType,
    example: WorkoutType.PUSH_PULL_LEGS,
  })
  @IsEnum(WorkoutType)
  workoutType: WorkoutType;

  @ApiProperty({
    description: 'Number of rest days during the week',
    example: 1,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  restDays: number;

  @ApiProperty({
    description: 'Number of training days during the week',
    example: 5,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  trainingDays: number;

  @ApiProperty({
    description: 'ID of the user who owns this training week',
    example: 1,
  })
  @IsInt()
  userId: number;
}
