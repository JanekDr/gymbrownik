import { CreateWorkoutDto } from "./dto/create-workout.dto";
import { UpdateWorkoutDto } from "./dto/update-workout.dto";
export declare class WorkoutService {
    create(createWorkoutDto: CreateWorkoutDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateWorkoutDto: UpdateWorkoutDto): string;
    remove(id: number): string;
}
