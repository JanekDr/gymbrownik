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
import { TrainingDayService } from './training-day.service';
import { CreateTrainingDayDto } from './dto/create-training-day.dto';
import { UpdateTrainingDayDto } from './dto/update-training-day.dto';
import { AuthGuard } from '@nestjs/passport';
import { OwnerOrAdminGuard } from '../auth/owner-or-admin.guard';
import { Resource } from '../auth/decorators/resource.decorator';

@ApiTags('training-days')
@Controller('training-day')
@UseGuards(AuthGuard('jwt'))
export class TrainingDayController {
  constructor(private readonly trainingDayService: TrainingDayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new training day' })
  @ApiResponse({ status: 201, description: 'Training day created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createDto: CreateTrainingDayDto) {
    return this.trainingDayService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all training days' })
  @ApiResponse({ status: 200, description: 'List of training days retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll() {
    return this.trainingDayService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get training day by ID' })
  @ApiResponse({ status: 200, description: 'Training day details retrieved' })
  @ApiResponse({ status: 404, description: 'Training day not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.trainingDayService.findOne(id);
  }

  @UseGuards(OwnerOrAdminGuard)
  @Resource('trainingDay')
  @Patch(':id')
  @ApiOperation({ summary: 'Update training day by ID' })
  @ApiResponse({ status: 200, description: 'Training day updated successfully' })
  @ApiResponse({ status: 404, description: 'Training day not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTrainingDayDto,
  ) {
    return this.trainingDayService.update(id, updateDto);
  }

  @UseGuards(OwnerOrAdminGuard)
  @Resource('trainingDay')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete training day by ID' })
  @ApiResponse({ status: 204, description: 'Training day deleted successfully' })
  @ApiResponse({ status: 404, description: 'Training day not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.trainingDayService.remove(id);
  }

  @Get(':id/volume-balance')
  @UseGuards(OwnerOrAdminGuard)
  @Resource('trainingDay')
  @ApiOperation({
    summary: 'Analyze volume balance between muscle groups for a given day',
  })
  @ApiResponse({
    status: 200,
    description: 'Volume balance analysis completed successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Training day not found or no workout data available',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async analyzeVolumeBalanceForDay(@Param('id', ParseIntPipe) id: number) {
    return this.trainingDayService.analyzeVolumeBalanceForDay(id);
  }
}
