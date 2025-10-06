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
import { TrainingWeekService } from './training-week.service';
import { CreateTrainingWeekDto } from './dto/create-training-week.dto';
import { UpdateTrainingWeekDto } from './dto/update-training-week.dto';
import { OwnerOrAdminGuard } from '../auth/owner-or-admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Resource } from '../auth/decorators/resource.decorator';

@ApiTags('training-weeks')
@Controller('training-week')
@UseGuards(AuthGuard('jwt'))
export class TrainingWeekController {
  constructor(private readonly trainingWeekService: TrainingWeekService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new training week' })
  @ApiResponse({ status: 201, description: 'Training week created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createDto: CreateTrainingWeekDto) {
    return this.trainingWeekService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all training weeks' })
  @ApiResponse({ status: 200, description: 'List of training weeks retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll() {
    return this.trainingWeekService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get training week by ID' })
  @ApiResponse({ status: 200, description: 'Training week details retrieved' })
  @ApiResponse({ status: 404, description: 'Training week not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.trainingWeekService.findOne(id);
  }

  @UseGuards(OwnerOrAdminGuard)
  @Resource('trainingWeek')
  @Patch(':id')
  @ApiOperation({ summary: 'Update training week by ID' })
  @ApiResponse({ status: 200, description: 'Training week updated successfully' })
  @ApiResponse({ status: 404, description: 'Training week not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTrainingWeekDto,
  ) {
    return this.trainingWeekService.update(id, updateDto);
  }

  @UseGuards(OwnerOrAdminGuard)
  @Resource('trainingWeek')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete training week by ID' })
  @ApiResponse({ status: 204, description: 'Training week deleted successfully' })
  @ApiResponse({ status: 404, description: 'Training week not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.trainingWeekService.remove(id);
  }
}
