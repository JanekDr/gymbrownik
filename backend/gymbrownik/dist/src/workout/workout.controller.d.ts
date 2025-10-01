import { WorkoutService } from "./workout.service";
import { CreateWorkoutDto } from "./dto/create-workout.dto";
import { UpdateWorkoutDto } from "./dto/update-workout.dto";
export declare class WorkoutController {
    private readonly workoutService;
    constructor(workoutService: WorkoutService);
    create(createWorkoutDto: CreateWorkoutDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateWorkoutDto: UpdateWorkoutDto): string;
    remove(id: string): string;
}
