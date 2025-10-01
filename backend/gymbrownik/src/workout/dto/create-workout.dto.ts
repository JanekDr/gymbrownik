import { IsNotEmpty, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateExerciseDto } from '../../exercise/dto/create-exercise.dto';

export class CreateWorkoutDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateExerciseDto)
    exercises?: CreateExerciseDto[];
}
