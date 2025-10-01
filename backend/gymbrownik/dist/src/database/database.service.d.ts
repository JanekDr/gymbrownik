import { PrismaClient } from "@prisma/client";
import { OnModuleInit } from "@nestjs/common";
export declare class DatabaseService extends PrismaClient implements OnModuleInit {
    onModuleInit(): Promise<void>;
}
