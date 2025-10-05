import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete, UseGuards,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import {OwnerOrAdminGuard} from "../auth/owner-or-admin.guard";
import {AuthGuard} from "@nestjs/passport";
import {Resource} from "../auth/decorators/resource.decorator";

@Controller('workout')
@UseGuards(AuthGuard('jwt'))
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  create(@Body() createDto: CreateWorkoutDto) {
    return this.workoutService.create(createDto);
  }

  @Get()
  findAll() {
    return this.workoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutService.findOne(+id);
  }

  @UseGuards(OwnerOrAdminGuard)
  @Resource('workout')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateWorkoutDto) {
    return this.workoutService.update(+id, updateDto);
  }

  @UseGuards(OwnerOrAdminGuard)
  @Resource('workout')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutService.remove(+id);
  }
}
