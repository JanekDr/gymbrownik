import { TrainingWeekService } from './training-week.service';
import { CreateTrainingWeekDto } from './dto/create-training-week.dto';
import { UpdateTrainingWeekDto } from './dto/update-training-week.dto';
export declare class TrainingWeekController {
    private readonly trainingWeekService;
    constructor(trainingWeekService: TrainingWeekService);
    create(createDto: CreateTrainingWeekDto): Promise<{
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
            password: string;
            authRole: import("@prisma/client").$Enums.AuthRole;
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
            password: string;
            authRole: import("@prisma/client").$Enums.AuthRole;
        };
    } & {
        name: string;
        id: number;
        workoutType: import("@prisma/client").$Enums.WorkoutType;
        restDays: number;
        trainingDays: number;
        userId: number;
    })[]>;
    findOne(id: string): Promise<{
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
            password: string;
            authRole: import("@prisma/client").$Enums.AuthRole;
        };
    } & {
        name: string;
        id: number;
        workoutType: import("@prisma/client").$Enums.WorkoutType;
        restDays: number;
        trainingDays: number;
        userId: number;
    }>;
    update(id: string, updateDto: UpdateTrainingWeekDto): Promise<{
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
            password: string;
            authRole: import("@prisma/client").$Enums.AuthRole;
        };
    } & {
        name: string;
        id: number;
        workoutType: import("@prisma/client").$Enums.WorkoutType;
        restDays: number;
        trainingDays: number;
        userId: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
