import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { BodyPart } from '@prisma/client';

export class CreateExerciseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(BodyPart)
    bodyPart: BodyPart;
}
