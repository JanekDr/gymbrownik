import { DatabaseService } from 'src/database/database.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
export declare class WorkoutService {
    private readonly database;
    constructor(database: DatabaseService);
    private getWorkoutOrThrow;
    create(dto: CreateWorkoutDto): Promise<{
        exercises: ({
            exercise: {
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
        })[];
        days: {
            id: number;
            dayOfWeek: number;
            workoutId: number;
            trainingWeekId: number;
        }[];
    } & {
        name: string;
        id: number;
    }>;
    findAll(): Promise<({
        exercises: ({
            exercise: {
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
        })[];
        days: {
            id: number;
            dayOfWeek: number;
            workoutId: number;
            trainingWeekId: number;
        }[];
    } & {
        name: string;
        id: number;
    })[]>;
    findOne(id: number): Promise<{
        exercises: ({
            exercise: {
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
        })[];
        days: {
            id: number;
            dayOfWeek: number;
            workoutId: number;
            trainingWeekId: number;
        }[];
    } & {
        name: string;
        id: number;
    }>;
    update(id: number, dto: UpdateWorkoutDto): Promise<{
        exercises: ({
            exercise: {
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
        })[];
        days: {
            id: number;
            dayOfWeek: number;
            workoutId: number;
            trainingWeekId: number;
        }[];
    } & {
        name: string;
        id: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
