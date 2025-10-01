import { DatabaseService } from "src/database/database.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserService {
    private readonly database;
    constructor(database: DatabaseService);
    private getUserOrThrow;
    create(dto: CreateUserDto): Promise<{
        trainingWeeks: {
            id: number;
            name: string;
            workoutType: import("@prisma/client").$Enums.WorkoutType;
            restDays: number;
            trainingDays: number;
            userId: number;
        }[];
    } & {
        id: number;
        name: string;
        email: string;
    }>;
    findAll(): Promise<({
        trainingWeeks: {
            id: number;
            name: string;
            workoutType: import("@prisma/client").$Enums.WorkoutType;
            restDays: number;
            trainingDays: number;
            userId: number;
        }[];
    } & {
        id: number;
        name: string;
        email: string;
    })[]>;
    findOne(id: number): Promise<{
        trainingWeeks: {
            id: number;
            name: string;
            workoutType: import("@prisma/client").$Enums.WorkoutType;
            restDays: number;
            trainingDays: number;
            userId: number;
        }[];
    } & {
        id: number;
        name: string;
        email: string;
    }>;
    update(id: number, dto: UpdateUserDto): Promise<{
        trainingWeeks: {
            id: number;
            name: string;
            workoutType: import("@prisma/client").$Enums.WorkoutType;
            restDays: number;
            trainingDays: number;
            userId: number;
        }[];
    } & {
        id: number;
        name: string;
        email: string;
    }>;
    remove(id: number): Promise<void>;
}
