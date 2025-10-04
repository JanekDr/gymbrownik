import { DatabaseService } from 'src/database/database.service';
import { CreateTrainingDayDto } from './dto/create-training-day.dto';
import { UpdateTrainingDayDto } from './dto/update-training-day.dto';
export declare class TrainingDayService {
    private readonly database;
    constructor(database: DatabaseService);
    private getTrainingDayOrThrow;
    create(dto: CreateTrainingDayDto): Promise<{
        workout: {
            name: string;
            id: number;
        };
        trainingWeek: {
            name: string;
            id: number;
            workoutType: import("@prisma/client").$Enums.WorkoutType;
            restDays: number;
            trainingDays: number;
            userId: number;
        };
    } & {
        id: number;
        dayOfWeek: number;
        workoutId: number;
        trainingWeekId: number;
    }>;
    findAll(): Promise<({
        workout: {
            name: string;
            id: number;
        };
        trainingWeek: {
            name: string;
            id: number;
            workoutType: import("@prisma/client").$Enums.WorkoutType;
            restDays: number;
            trainingDays: number;
            userId: number;
        };
    } & {
        id: number;
        dayOfWeek: number;
        workoutId: number;
        trainingWeekId: number;
    })[]>;
    findOne(id: number): Promise<{
        workout: {
            name: string;
            id: number;
        };
        trainingWeek: {
            name: string;
            id: number;
            workoutType: import("@prisma/client").$Enums.WorkoutType;
            restDays: number;
            trainingDays: number;
            userId: number;
        };
    } & {
        id: number;
        dayOfWeek: number;
        workoutId: number;
        trainingWeekId: number;
    }>;
    update(id: number, dto: UpdateTrainingDayDto): Promise<{
        workout: {
            name: string;
            id: number;
        };
        trainingWeek: {
            name: string;
            id: number;
            workoutType: import("@prisma/client").$Enums.WorkoutType;
            restDays: number;
            trainingDays: number;
            userId: number;
        };
    } & {
        id: number;
        dayOfWeek: number;
        workoutId: number;
        trainingWeekId: number;
    }>;
    analyzeVolumeBalanceForDay(id: number): Promise<{
        trainingDayId: number;
        workoutName: string;
        message: string;
        summary: Record<string, number>;
        details?: undefined;
    } | {
        trainingDayId: number;
        workoutName: string;
        message: string;
        summary: Record<string, number>;
        details: {
            comparison: string;
            difference: number;
            weakerPart: string;
            exercises: string[];
        }[];
    }>;
    remove(id: number): Promise<void>;
}
