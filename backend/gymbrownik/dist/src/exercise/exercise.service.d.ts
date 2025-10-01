import { DatabaseService } from "src/database/database.service";
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
export declare class ExerciseService {
    private prisma;
    constructor(prisma: DatabaseService);
    create(dto: CreateExerciseDto): Promise<{
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
    findOne(id: number): Promise<{
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
    update(id: number, dto: UpdateExerciseDto): Promise<{
        id: number;
        name: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
    }>;
}
