import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
export declare class ExerciseController {
    private readonly exerciseService;
    constructor(exerciseService: ExerciseService);
    create(createExerciseDto: CreateExerciseDto): Promise<{
        id: number;
        name: string;
    }>;
    findAll(): Promise<({
        workouts: {
            id: number;
            series: number;
            reps: number;
            weight: import("@prisma/client/runtime/library").Decimal;
            rest: number | null;
            exerciseId: number;
            workoutId: number;
        }[];
    } & {
        id: number;
        name: string;
    })[]>;
    findOne(id: string): Promise<{
        workouts: {
            id: number;
            series: number;
            reps: number;
            weight: import("@prisma/client/runtime/library").Decimal;
            rest: number | null;
            exerciseId: number;
            workoutId: number;
        }[];
    } & {
        id: number;
        name: string;
    }>;
    update(id: string, updateExerciseDto: UpdateExerciseDto): Promise<{
        id: number;
        name: string;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
    }>;
}
