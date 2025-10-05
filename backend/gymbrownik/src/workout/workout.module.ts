import { Module } from "@nestjs/common";
import { WorkoutService } from "./workout.service";
import { WorkoutController } from "./workout.controller";
import { DatabaseModule } from "src/database/database.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [WorkoutController],
  imports: [DatabaseModule, AuthModule],
  providers: [WorkoutService],
})
export class WorkoutModule {}
