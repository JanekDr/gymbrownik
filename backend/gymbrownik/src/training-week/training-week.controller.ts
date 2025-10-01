import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainingWeekService } from './training-week.service';
import { CreateTrainingWeekDto } from './dto/create-training-week.dto';
import { UpdateTrainingWeekDto } from './dto/update-training-week.dto';

@Controller('training-week')
export class TrainingWeekController {
  constructor(private readonly trainingWeekService: TrainingWeekService) {}

  @Post()
  create(@Body() createTrainingWeekDto: CreateTrainingWeekDto) {
    return this.trainingWeekService.create(createTrainingWeekDto);
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
  update(@Param('id') id: string, @Body() updateTrainingWeekDto: UpdateTrainingWeekDto) {
    return this.trainingWeekService.update(+id, updateTrainingWeekDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingWeekService.remove(+id);
  }
}
