import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete, UseGuards,
} from '@nestjs/common';
import { TrainingWeekService } from './training-week.service';
import { CreateTrainingWeekDto } from './dto/create-training-week.dto';
import { UpdateTrainingWeekDto } from './dto/update-training-week.dto';
import {OwnerOrAdminGuard} from "../auth/owner-or-admin.guard";
import {AuthGuard} from "@nestjs/passport";
import {Resource} from "../auth/decorators/resource.decorator";

@Controller('training-week')
@UseGuards(AuthGuard('jwt'))
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

  @UseGuards(OwnerOrAdminGuard)
  @Resource('trainingWeek')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateTrainingWeekDto) {
    return this.trainingWeekService.update(+id, updateDto);
  }

  @UseGuards(OwnerOrAdminGuard)
  @Resource('trainingWeek')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingWeekService.remove(+id);
  }
}
