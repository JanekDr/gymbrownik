import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WorkoutExerciseService } from './workout-exercise.service';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/update-workout-exercise.dto';
import { UpdateStatsDto } from './dto/update-stats.dto';
import { AuthGuard } from '@nestjs/passport';
import { OwnerOrAdminGuard } from '../auth/owner-or-admin.guard';
import { Resource } from '../auth/decorators/resource.decorator';

@ApiTags('workout-exercises')
@Controller('workout-exercise')
@UseGuards(AuthGuard('jwt'))
export class WorkoutExerciseController {
  constructor(private readonly service: WorkoutExerciseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workout exercise' })
  @ApiResponse({ status: 201, description: 'Workout exercise created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() dto: CreateWorkoutExerciseDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all workout exercises' })
  @ApiResponse({ status: 200, description: 'List of workout exercises retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get workout exercise by ID' })
  @ApiResponse({ status: 200, description: 'Workout exercise details retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Workout exercise not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @UseGuards(OwnerOrAdminGuard)
  @Resource('workoutExercise')
  @Patch(':id')
  @ApiOperation({ summary: 'Update workout exercise by ID' })
  @ApiResponse({ status: 200, description: 'Workout exercise updated successfully' })
  @ApiResponse({ status: 404, description: 'Workout exercise not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateWorkoutExerciseDto,
  ) {
    return this.service.update(id, dto);
  }

  @UseGuards(OwnerOrAdminGuard)
  @Resource('workoutExercise')
  @Patch(':id/stats')
  @ApiOperation({ summary: 'Update exercise stats (reps, weight) and save history' })
  @ApiResponse({ status: 200, description: 'Exercise stats updated successfully' })
  @ApiResponse({ status: 404, description: 'Workout exercise not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateStats(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatsDto,
  ) {
    return this.service.updateStats(id, dto.reps, dto.weight);
  }

  @UseGuards(OwnerOrAdminGuard)
  @Resource('workoutExercise')
  @Get(':id/history')
  @ApiOperation({ summary: 'Get exercise history (previous reps and weights)' })
  @ApiResponse({ status: 200, description: 'Exercise history retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Workout exercise not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getHistory(@Param('id', ParseIntPipe) id: number) {
    return this.service.getHistory(id);
  }

  @UseGuards(OwnerOrAdminGuard)
  @Resource('workoutExercise')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete workout exercise by ID' })
  @ApiResponse({ status: 204, description: 'Workout exercise deleted successfully' })
  @ApiResponse({ status: 404, description: 'Workout exercise not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
