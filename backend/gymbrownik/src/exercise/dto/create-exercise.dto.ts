import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BodyPart } from '@prisma/client';

export class CreateExerciseDto {
  @ApiProperty({
    description: 'Name of the exercise (e.g., Bench Press, Squat, Deadlift)',
    example: 'Bench Press',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Body part targeted by the exercise',
    enum: BodyPart,
    example: BodyPart.CHEST,
  })
  @IsEnum(BodyPart)
  bodyPart: BodyPart;
}
