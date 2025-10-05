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
        password: string;
        authRole: import("@prisma/client").$Enums.AuthRole;
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
        password: string;
        authRole: import("@prisma/client").$Enums.AuthRole;
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
        password: string;
        authRole: import("@prisma/client").$Enums.AuthRole;
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
        password: string;
        authRole: import("@prisma/client").$Enums.AuthRole;
    }>;
    remove(id: number): Promise<void>;
}
