import { Module } from "@nestjs/common";
import { WorkoutService } from "./workout.service";
import { WorkoutController } from "./workout.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
  controllers: [WorkoutController],
  imports: [DatabaseModule],
  providers: [WorkoutService],
})
export class WorkoutModule {}
