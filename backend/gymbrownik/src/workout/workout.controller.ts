import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { OwnerOrAdminGuard } from '../auth/owner-or-admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Resource } from '../auth/decorators/resource.decorator';

@ApiTags('workouts')
@Controller('workout')
@UseGuards(AuthGuard('jwt'))
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workout' })
  @ApiResponse({ status: 201, description: 'Workout created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createDto: CreateWorkoutDto) {
    return this.workoutService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all workouts' })
  @ApiResponse({ status: 200, description: 'List of workouts retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll() {
    return this.workoutService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get workout by ID' })
  @ApiResponse({ status: 200, description: 'Workout details retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Workout not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.workoutService.findOne(id);
  }

  @UseGuards(OwnerOrAdminGuard)
  @Resource('workout')
  @Patch(':id')
  @ApiOperation({ summary: 'Update workout by ID' })
  @ApiResponse({ status: 200, description: 'Workout updated successfully' })
  @ApiResponse({ status: 404, description: 'Workout not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateWorkoutDto,
  ) {
    return this.workoutService.update(id, updateDto);
  }

  @UseGuards(OwnerOrAdminGuard)
  @Resource('workout')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete workout by ID' })
  @ApiResponse({ status: 204, description: 'Workout deleted successfully' })
  @ApiResponse({ status: 404, description: 'Workout not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.workoutService.remove(id);
  }
}
