import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from "src/database/database.service";
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExerciseService {
    constructor(private readonly prisma: DatabaseService) {}

    async create(workoutId: number, createExerciseDto: CreateExerciseDto) {
        return this.prisma.exercise.create({
            data: {
                ...createExerciseDto,
                workoutId,
            },
        });
    }

    async findAll() {
        return this.prisma.exercise.findMany({
            include: { workout: true },
        });
    }

    async findOne(id: number) {
        const exercise = await this.prisma.exercise.findUnique({
            where: { id },
            include: { workout: true },
        });

        if (!exercise) {
            throw new NotFoundException(`Exercise with id ${id} not found`);
        }

        return exercise;
    }

    async update(id: number, updateExerciseDto: UpdateExerciseDto) {
        try {
            return await this.prisma.exercise.update({
                where: { id },
                data: updateExerciseDto,
            });
        } catch (e) {
            throw new NotFoundException(`Exercise with id ${id} not found`);
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.exercise.delete({
                where: { id },
            });
        } catch (e) {
            throw new NotFoundException(`Exercise with id ${id} not found`);
        }
    }
}
