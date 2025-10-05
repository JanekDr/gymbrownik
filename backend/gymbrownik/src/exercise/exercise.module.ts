import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { DatabaseModule } from '../database/database.module';
import {AuthModule} from "../auth/auth.module";

@Module({
    controllers: [ExerciseController],
    imports: [DatabaseModule, AuthModule],
    providers: [ExerciseService],
})
export class ExerciseModule {}
