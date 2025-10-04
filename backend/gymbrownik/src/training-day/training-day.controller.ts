import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrainingDayService } from './training-day.service';
import { CreateTrainingDayDto } from './dto/create-training-day.dto';
import { UpdateTrainingDayDto } from './dto/update-training-day.dto';

@Controller('training-day')
export class TrainingDayController {
  constructor(private readonly trainingDayService: TrainingDayService) {}

  @Post()
  create(@Body() createDto: CreateTrainingDayDto) {
    return this.trainingDayService.create(createDto);
  }

  @Get()
  findAll() {
    return this.trainingDayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingDayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateTrainingDayDto) {
    return this.trainingDayService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingDayService.remove(+id);
  }

  @Get(':id/volume-balance')
  analyzeVolumeBalanceForDay(@Param('id') id: string) {
  return this.trainingDayService.analyzeVolumeBalanceForDay(+id);
}

}
