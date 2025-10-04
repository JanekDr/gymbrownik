import { DatabaseService } from 'src/database/database.service';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/update-workout-exercise.dto';
export declare class WorkoutExerciseService {
    private readonly database;
    constructor(database: DatabaseService);
    private getOrThrow;
    create(dto: CreateWorkoutExerciseDto): Promise<{
        exercise: {
            name: string;
            id: number;
        };
        workout: {
            name: string;
            id: number;
        };
    } & {
        id: number;
        workoutId: number;
        exerciseId: number;
        series: number;
        reps: number;
        weight: import("@prisma/client/runtime/library").Decimal;
        rest: number | null;
        history: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    findAll(): Promise<({
        exercise: {
            name: string;
            id: number;
        };
        workout: {
            name: string;
            id: number;
        };
    } & {
        id: number;
        workoutId: number;
        exerciseId: number;
        series: number;
        reps: number;
        weight: import("@prisma/client/runtime/library").Decimal;
        rest: number | null;
        history: import("@prisma/client/runtime/library").JsonValue | null;
    })[]>;
    findOne(id: number): Promise<{
        exercise: {
            name: string;
            id: number;
        };
        workout: {
            name: string;
            id: number;
        };
    } & {
        id: number;
        workoutId: number;
        exerciseId: number;
        series: number;
        reps: number;
        weight: import("@prisma/client/runtime/library").Decimal;
        rest: number | null;
        history: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    update(id: number, dto: UpdateWorkoutExerciseDto): Promise<{
        exercise: {
            name: string;
            id: number;
        };
        workout: {
            name: string;
            id: number;
        };
    } & {
        id: number;
        workoutId: number;
        exerciseId: number;
        series: number;
        reps: number;
        weight: import("@prisma/client/runtime/library").Decimal;
        rest: number | null;
        history: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    updateStats(id: number, reps: number, weight: number): Promise<{
        exercise: {
            name: string;
            id: number;
        };
        workout: {
            name: string;
            id: number;
        };
    } & {
        id: number;
        workoutId: number;
        exerciseId: number;
        series: number;
        reps: number;
        weight: import("@prisma/client/runtime/library").Decimal;
        rest: number | null;
        history: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    getHistory(id: number): Promise<{
        message: string;
        history: never[];
        exerciseId?: undefined;
        exerciseName?: undefined;
        workoutName?: undefined;
        totalEntries?: undefined;
    } | {
        exerciseId: number;
        exerciseName: string;
        workoutName: string;
        totalEntries: number;
        history: any[];
        message?: undefined;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
