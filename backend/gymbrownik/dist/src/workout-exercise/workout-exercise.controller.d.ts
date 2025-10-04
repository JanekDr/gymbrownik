import { WorkoutExerciseService } from './workout-exercise.service';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/update-workout-exercise.dto';
import { UpdateStatsDto } from './dto/update-stats.dto';
export declare class WorkoutExerciseController {
    private readonly service;
    constructor(service: WorkoutExerciseService);
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
    findOne(id: string): Promise<{
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
    update(id: string, dto: UpdateWorkoutExerciseDto): Promise<{
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
    updateStats(id: string, dto: UpdateStatsDto): Promise<{
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
    getHistory(id: string): Promise<{
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
    remove(id: string): Promise<{
        message: string;
    }>;
}
