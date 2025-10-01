import { DatabaseService } from 'src/database/database.service';
import { CreateTrainingWeekDto } from './dto/create-training-week.dto';
import { UpdateTrainingWeekDto } from './dto/update-training-week.dto';
export declare class TrainingWeekService {
    private readonly database;
    constructor(database: DatabaseService);
    private getWeekOrThrow;
    create(dto: CreateTrainingWeekDto): Promise<{
        days: {
            id: number;
            dayOfWeek: number;
            workoutId: number;
            trainingWeekId: number;
        }[];
        user: {
            name: string;
            id: number;
            email: string;
        };
    } & {
        name: string;
        id: number;
        workoutType: import("@prisma/client").$Enums.WorkoutType;
        restDays: number;
        trainingDays: number;
        userId: number;
    }>;
    findAll(): Promise<({
        days: ({
            workout: {
                name: string;
                id: number;
            };
        } & {
            id: number;
            dayOfWeek: number;
            workoutId: number;
            trainingWeekId: number;
        })[];
        user: {
            name: string;
            id: number;
            email: string;
        };
    } & {
        name: string;
        id: number;
        workoutType: import("@prisma/client").$Enums.WorkoutType;
        restDays: number;
        trainingDays: number;
        userId: number;
    })[]>;
    findOne(id: number): Promise<{
        days: ({
            workout: {
                name: string;
                id: number;
            };
        } & {
            id: number;
            dayOfWeek: number;
            workoutId: number;
            trainingWeekId: number;
        })[];
        user: {
            name: string;
            id: number;
            email: string;
        };
    } & {
        name: string;
        id: number;
        workoutType: import("@prisma/client").$Enums.WorkoutType;
        restDays: number;
        trainingDays: number;
        userId: number;
    }>;
    update(id: number, dto: UpdateTrainingWeekDto): Promise<{
        days: ({
            workout: {
                name: string;
                id: number;
            };
        } & {
            id: number;
            dayOfWeek: number;
            workoutId: number;
            trainingWeekId: number;
        })[];
        user: {
            name: string;
            id: number;
            email: string;
        };
    } & {
        name: string;
        id: number;
        workoutType: import("@prisma/client").$Enums.WorkoutType;
        restDays: number;
        trainingDays: number;
        userId: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
