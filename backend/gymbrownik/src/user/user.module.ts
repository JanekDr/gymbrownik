import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
  controllers: [UserController],
  imports: [DatabaseModule],
  providers: [UserService],
})
export class UserModule {}
