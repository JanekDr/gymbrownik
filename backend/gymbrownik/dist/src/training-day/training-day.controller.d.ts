import { TrainingDayService } from './training-day.service';
import { CreateTrainingDayDto } from './dto/create-training-day.dto';
import { UpdateTrainingDayDto } from './dto/update-training-day.dto';
export declare class TrainingDayController {
    private readonly trainingDayService;
    constructor(trainingDayService: TrainingDayService);
    create(createDto: CreateTrainingDayDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateDto: UpdateTrainingDayDto): Promise<{
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
    remove(id: string): Promise<void>;
    analyzeVolumeBalanceForDay(id: string): Promise<{
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
}
