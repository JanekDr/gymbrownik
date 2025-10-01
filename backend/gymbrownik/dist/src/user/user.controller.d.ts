import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
    remove(id: string): Promise<void>;
}
