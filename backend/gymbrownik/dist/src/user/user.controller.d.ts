import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
    remove(id: string): Promise<void>;
}
