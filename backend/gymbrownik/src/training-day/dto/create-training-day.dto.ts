import { IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainingDayDto {
  @ApiProperty({
    description: 'Day of the week for the training session (1 = Monday, 7 = Sunday)',
    example: 3,
    minimum: 1,
    maximum: 7,
  })
  @IsInt()
  @Min(1)
  @Max(7)
  dayOfWeek: number;

  @ApiProperty({
    description: 'ID of the training week this day belongs to',
    example: 1,
  })
  @IsInt()
  trainingWeekId: number;

  @ApiProperty({
    description: 'ID of the workout assigned to this day',
    example: 5,
  })
  @IsInt()
  workoutId: number;
}
