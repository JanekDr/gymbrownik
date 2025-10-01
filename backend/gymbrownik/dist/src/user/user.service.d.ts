import { DatabaseService } from "src/database/database.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserService {
    private readonly database;
    constructor(database: DatabaseService);
    private getUserOrThrow;
    create(dto: CreateUserDto): Promise<{
        trainingWeeks: {
            name: string;
            id: number;
            workoutType: import("@prisma/client").$Enums.WorkoutType;
            restDays: number;
            trainingDays: number;
            userId: number;
        }[];
    } & {
        name: string;
        id: number;
        email: string;
    }>;
    findAll(): Promise<({
        trainingWeeks: {
            name: string;
            id: number;
            workoutType: import("@prisma/client").$Enums.WorkoutType;
            restDays: number;
            trainingDays: number;
            userId: number;
        }[];
    } & {
        name: string;
        id: number;
        email: string;
    })[]>;
    findOne(id: number): Promise<{
        trainingWeeks: {
            name: string;
            id: number;
            workoutType: import("@prisma/client").$Enums.WorkoutType;
            restDays: number;
            trainingDays: number;
            userId: number;
        }[];
    } & {
        name: string;
        id: number;
        email: string;
    }>;
    update(id: number, dto: UpdateUserDto): Promise<{
        trainingWeeks: {
            name: string;
            id: number;
            workoutType: import("@prisma/client").$Enums.WorkoutType;
            restDays: number;
            trainingDays: number;
            userId: number;
        }[];
    } & {
        name: string;
        id: number;
        email: string;
    }>;
    remove(id: number): Promise<void>;
}
