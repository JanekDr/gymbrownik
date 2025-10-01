import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
    controllers: [ExerciseController],
    imports: [DatabaseModule],
    providers: [ExerciseService],
})
export class ExerciseModule {}
