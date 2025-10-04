import { WorkoutExerciseService } from './workout-exercise.service';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/update-workout-exercise.dto';
import { UpdateStatsDto } from './dto/update-stats.dto';
export declare class WorkoutExerciseController {
    private readonly service;
    constructor(service: WorkoutExerciseService);
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
    findOne(id: string): Promise<{
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
    update(id: string, dto: UpdateWorkoutExerciseDto): Promise<{
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
    updateStats(id: string, dto: UpdateStatsDto): Promise<{
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
