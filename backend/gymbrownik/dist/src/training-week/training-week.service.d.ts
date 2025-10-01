import { CreateTrainingWeekDto } from './dto/create-training-week.dto';
import { UpdateTrainingWeekDto } from './dto/update-training-week.dto';
export declare class TrainingWeekService {
    create(createTrainingWeekDto: CreateTrainingWeekDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTrainingWeekDto: UpdateTrainingWeekDto): string;
    remove(id: number): string;
}
