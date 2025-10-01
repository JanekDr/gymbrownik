import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateExerciseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsPositive()
    series: number;

    @IsInt()
    @IsPositive()
    reps: number;

    @IsPositive()
    weight: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    rest?: number; // sekundy
}
