import { DatabaseService } from 'src/database/database.service';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/update-workout-exercise.dto';
export declare class WorkoutExerciseService {
    private readonly database;
    constructor(database: DatabaseService);
    private getOrThrow;
    create(dto: CreateWorkoutExerciseDto): Promise<{
        workout: {
            id: number;
            name: string;
        };
        exercise: {
            id: number;
            name: string;
        };
    } & {
        series: number;
        reps: number;
        weight: import("@prisma/client/runtime/library").Decimal;
        rest: number | null;
        history: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        workoutId: number;
        exerciseId: number;
    }>;
    findAll(): Promise<({
        workout: {
            id: number;
            name: string;
        };
        exercise: {
            id: number;
            name: string;
        };
    } & {
        series: number;
        reps: number;
        weight: import("@prisma/client/runtime/library").Decimal;
        rest: number | null;
        history: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        workoutId: number;
        exerciseId: number;
    })[]>;
    findOne(id: number): Promise<{
        workout: {
            id: number;
            name: string;
        };
        exercise: {
            id: number;
            name: string;
        };
    } & {
        series: number;
        reps: number;
        weight: import("@prisma/client/runtime/library").Decimal;
        rest: number | null;
        history: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        workoutId: number;
        exerciseId: number;
    }>;
    update(id: number, dto: UpdateWorkoutExerciseDto): Promise<{
        workout: {
            id: number;
            name: string;
        };
        exercise: {
            id: number;
            name: string;
        };
    } & {
        series: number;
        reps: number;
        weight: import("@prisma/client/runtime/library").Decimal;
        rest: number | null;
        history: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        workoutId: number;
        exerciseId: number;
    }>;
    updateStats(id: number, reps: number, weight: number): Promise<{
        workout: {
            id: number;
            name: string;
        };
        exercise: {
            id: number;
            name: string;
        };
    } & {
        series: number;
        reps: number;
        weight: import("@prisma/client/runtime/library").Decimal;
        rest: number | null;
        history: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        workoutId: number;
        exerciseId: number;
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
