import { TrainingWeekService } from './training-week.service';
import { CreateTrainingWeekDto } from './dto/create-training-week.dto';
import { UpdateTrainingWeekDto } from './dto/update-training-week.dto';
export declare class TrainingWeekController {
    private readonly trainingWeekService;
    constructor(trainingWeekService: TrainingWeekService);
    create(createTrainingWeekDto: CreateTrainingWeekDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTrainingWeekDto: UpdateTrainingWeekDto): string;
    remove(id: string): string;
}
