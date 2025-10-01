import { DatabaseService } from 'src/database/database.service';
import { CreateTrainingDayDto } from './dto/create-training-day.dto';
import { UpdateTrainingDayDto } from './dto/update-training-day.dto';
export declare class TrainingDayService {
    private readonly database;
    constructor(database: DatabaseService);
    private getTrainingDayOrThrow;
    create(dto: CreateTrainingDayDto): Promise<{
        workout: {
            id: number;
            name: string;
        };
        trainingWeek: {
            id: number;
            name: string;
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
            id: number;
            name: string;
        };
        trainingWeek: {
            id: number;
            name: string;
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
            id: number;
            name: string;
        };
        trainingWeek: {
            id: number;
            name: string;
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
            id: number;
            name: string;
        };
        trainingWeek: {
            id: number;
            name: string;
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
    remove(id: number): Promise<void>;
}
