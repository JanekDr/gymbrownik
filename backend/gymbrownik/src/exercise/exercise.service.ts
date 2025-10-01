import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from "src/database/database.service";
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExerciseService {
    constructor(private prisma: DatabaseService) {}

    async create(dto: CreateExerciseDto) {
        return this.prisma.exercise.create({ data: dto });
    }

    async findAll() {
        return this.prisma.exercise.findMany({
            include: { workouts: true }, // opcjonalnie pokazuje w ilu workoutach wystepuje
        });
    }

    async findOne(id: number) {
        const exercise = await this.prisma.exercise.findUnique({
            where: { id },
            include: { workouts: true },
        });

        if (!exercise) {
            throw new NotFoundException(`Exercise with id ${id} not found`);
        }

        return exercise;
    }

    async update(id: number, dto: UpdateExerciseDto) {
        try {
            return await this.prisma.exercise.update({
                where: { id },
                data: dto,
            });
        } catch {
            throw new NotFoundException(`Exercise with id ${id} not found`);
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.exercise.delete({
                where: { id },
            });
        } catch {
            throw new NotFoundException(`Exercise with id ${id} not found`);
        }
    }
}
