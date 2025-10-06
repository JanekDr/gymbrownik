import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
export declare class ExerciseController {
    private readonly exerciseService;
    constructor(exerciseService: ExerciseService);
    create(createExerciseDto: CreateExerciseDto): Promise<{
        name: string;
        bodyPart: import("@prisma/client").$Enums.BodyPart | null;
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
            history: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
    } & {
        name: string;
        bodyPart: import("@prisma/client").$Enums.BodyPart | null;
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
            history: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
    } & {
        name: string;
        bodyPart: import("@prisma/client").$Enums.BodyPart | null;
        id: number;
    }>;
    update(id: number, updateExerciseDto: UpdateExerciseDto): Promise<{
        name: string;
        bodyPart: import("@prisma/client").$Enums.BodyPart | null;
        id: number;
    }>;
    remove(id: number): Promise<void>;
}
