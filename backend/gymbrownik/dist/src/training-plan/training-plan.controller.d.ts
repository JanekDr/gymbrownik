import { TrainingPlanService } from "./training-plan.service";
import { CreateTrainingPlanDto } from "./dto/create-training-plan.dto";
import { UpdateTrainingPlanDto } from "./dto/update-training-plan.dto";
export declare class TrainingPlanController {
    private readonly trainingPlanService;
    constructor(trainingPlanService: TrainingPlanService);
    create(createTrainingPlanDto: CreateTrainingPlanDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTrainingPlanDto: UpdateTrainingPlanDto): string;
    remove(id: string): string;
}
