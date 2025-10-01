import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrainingWeekService } from './training-week.service';
import { CreateTrainingWeekDto } from './dto/create-training-week.dto';
import { UpdateTrainingWeekDto } from './dto/update-training-week.dto';

@Controller('training-week')
export class TrainingWeekController {
  constructor(private readonly trainingWeekService: TrainingWeekService) {}

  @Post()
  create(@Body() createDto: CreateTrainingWeekDto) {
    return this.trainingWeekService.create(createDto);
  }

  @Get()
  findAll() {
    return this.trainingWeekService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingWeekService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateTrainingWeekDto) {
    return this.trainingWeekService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingWeekService.remove(+id);
  }
}
