import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
export declare class WorkoutController {
    private readonly workoutService;
    constructor(workoutService: WorkoutService);
    create(createDto: CreateWorkoutDto): Promise<{
        exercises: ({
            exercise: {
                name: string;
                bodyPart: import("@prisma/client").$Enums.BodyPart;
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
                bodyPart: import("@prisma/client").$Enums.BodyPart;
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
    findOne(id: string): Promise<{
        exercises: ({
            exercise: {
                name: string;
                bodyPart: import("@prisma/client").$Enums.BodyPart;
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
    update(id: string, updateDto: UpdateWorkoutDto): Promise<{
        exercises: ({
            exercise: {
                name: string;
                bodyPart: import("@prisma/client").$Enums.BodyPart;
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
    remove(id: string): Promise<{
        message: string;
    }>;
}
