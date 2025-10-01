import { WorkoutType } from '@prisma/client';
export declare class CreateTrainingWeekDto {
    name: string;
    workoutType: WorkoutType;
    restDays: number;
    trainingDays: number;
    userId: number;
}
