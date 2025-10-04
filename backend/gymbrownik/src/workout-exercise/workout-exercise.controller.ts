import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { WorkoutExerciseService } from './workout-exercise.service';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/update-workout-exercise.dto';
import { UpdateStatsDto } from './dto/update-stats.dto';

@Controller('workout-exercise')
export class WorkoutExerciseController {
  constructor(private readonly service: WorkoutExerciseService) {}

  @Post()
  create(@Body() dto: CreateWorkoutExerciseDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWorkoutExerciseDto) {
    return this.service.update(+id, dto);
  }

  @Patch(':id/stats')
  updateStats(@Param('id') id: string, @Body() dto: UpdateStatsDto) {
    return this.service.updateStats(+id, dto.reps, dto.weight);
  }

  @Get(':id/history')
  getHistory(@Param('id') id: string) {
    return this.service.getHistory(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
