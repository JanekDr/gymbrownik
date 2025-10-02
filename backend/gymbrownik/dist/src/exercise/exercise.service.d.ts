import { DatabaseService } from "src/database/database.service";
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
export declare class ExerciseService {
    private prisma;
    constructor(prisma: DatabaseService);
    create(dto: CreateExerciseDto): Promise<{
        name: string;
        bodyPart: import("@prisma/client").$Enums.BodyPart;
        id: number;
    }>;
    findAll(): Promise<({
        workouts: {
            id: number;
            workoutId: number;
            exerciseId: number;
            series: number;
            reps: number;
            weight: import("@prisma/client/runtime/library").Decimal;
            rest: number | null;
        }[];
    } & {
        name: string;
        bodyPart: import("@prisma/client").$Enums.BodyPart;
        id: number;
    })[]>;
    findOne(id: number): Promise<{
        workouts: {
            id: number;
            workoutId: number;
            exerciseId: number;
            series: number;
            reps: number;
            weight: import("@prisma/client/runtime/library").Decimal;
            rest: number | null;
        }[];
    } & {
        name: string;
        bodyPart: import("@prisma/client").$Enums.BodyPart;
        id: number;
    }>;
    update(id: number, dto: UpdateExerciseDto): Promise<{
        name: string;
        bodyPart: import("@prisma/client").$Enums.BodyPart;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        bodyPart: import("@prisma/client").$Enums.BodyPart;
        id: number;
    }>;
}
