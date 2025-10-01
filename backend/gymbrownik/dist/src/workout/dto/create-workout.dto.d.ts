import { CreateExerciseDto } from '../../exercise/dto/create-exercise.dto';
export declare class CreateWorkoutDto {
    name: string;
    exercises?: CreateExerciseDto[];
}
