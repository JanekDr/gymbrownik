import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainingWeekDto } from './create-training-week.dto';

export class UpdateTrainingWeekDto extends PartialType(CreateTrainingWeekDto) {}
