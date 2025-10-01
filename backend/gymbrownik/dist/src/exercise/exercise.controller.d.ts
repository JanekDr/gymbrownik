import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
export declare class ExerciseController {
    private readonly exerciseService;
    constructor(exerciseService: ExerciseService);
    create(createExerciseDto: CreateExerciseDto): Promise<{
        name: string;
        id: number;
    }>;
    findAll(): Promise<({
        workouts: {
            id: number;
            workoutId: number;
            exerciseId: number;
            series: number;
            reps: number;
            weight: import("@prisma/client/runtime/library").Decimal;
            rest: number | null;
        }[];
    } & {
        name: string;
        id: number;
    })[]>;
    findOne(id: string): Promise<{
        workouts: {
            id: number;
            workoutId: number;
            exerciseId: number;
            series: number;
            reps: number;
            weight: import("@prisma/client/runtime/library").Decimal;
            rest: number | null;
        }[];
    } & {
        name: string;
        id: number;
    }>;
    update(id: string, updateExerciseDto: UpdateExerciseDto): Promise<{
        name: string;
        id: number;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: number;
    }>;
}
