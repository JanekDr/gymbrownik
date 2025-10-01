import { CreateTrainingPlanDto } from "./dto/create-training-plan.dto";
import { UpdateTrainingPlanDto } from "./dto/update-training-plan.dto";
export declare class TrainingPlanService {
    create(createTrainingPlanDto: CreateTrainingPlanDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTrainingPlanDto: UpdateTrainingPlanDto): string;
    remove(id: number): string;
}
