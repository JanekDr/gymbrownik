import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete, UseGuards,
} from '@nestjs/common';
import { TrainingDayService } from './training-day.service';
import { CreateTrainingDayDto } from './dto/create-training-day.dto';
import { UpdateTrainingDayDto } from './dto/update-training-day.dto';
import {AuthGuard} from "@nestjs/passport";
import {OwnerOrAdminGuard} from "../auth/owner-or-admin.guard";
import {Resource} from "../auth/decorators/resource.decorator";

@Controller('training-day')
@UseGuards(AuthGuard('jwt'))
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

  @UseGuards(OwnerOrAdminGuard)
  @Resource('trainingDay')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateTrainingDayDto) {
    return this.trainingDayService.update(+id, updateDto);
  }

  @UseGuards(OwnerOrAdminGuard)
  @Resource('trainingDay')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingDayService.remove(+id);
  }

  @Get(':id/volume-balance')
  @UseGuards(OwnerOrAdminGuard)
  @Resource('trainingDay')
  analyzeVolumeBalanceForDay(@Param('id') id: string) {
  return this.trainingDayService.analyzeVolumeBalanceForDay(+id);
}

}
