import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseService } from './exercise.service';
import { DatabaseService } from '../database/database.service';
import { NotFoundException } from '@nestjs/common';
import { BodyPart } from '@prisma/client';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

describe('ExerciseService', () => {
    let service: ExerciseService;
    let prisma: any;

    beforeEach(async () => {
        const prismaMock = {
            exercise: {
                create: jest.fn(),
                findMany: jest.fn(),
                findUnique: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExerciseService,
                { provide: DatabaseService, useValue: prismaMock },
            ],
        }).compile();

        service = module.get<ExerciseService>(ExerciseService);
        prisma = module.get<DatabaseService>(DatabaseService);
    });

    afterEach(() => jest.clearAllMocks());

    // --- CREATE ---
    describe('create', () => {
        it('should create an exercise', async () => {
            const dto: CreateExerciseDto = { name: 'Bench Press', bodyPart: BodyPart.CHEST };
            const expected = { id: 1, ...dto };
            (prisma.exercise.create as jest.Mock).mockResolvedValue(expected);

            const result = await service.create(dto);

            expect(prisma.exercise.create).toHaveBeenCalledWith({ data: dto });
            expect(result).toEqual(expected);
        });
    });

    // --- FIND ALL ---
    describe('findAll', () => {
        it('should return all exercises', async () => {
            const exercises = [
                { id: 1, name: 'Squat', bodyPart: BodyPart.QUADRICEPS },
                { id: 2, name: 'Deadlift', bodyPart: BodyPart.BACK },
            ];
            (prisma.exercise.findMany as jest.Mock).mockResolvedValue(exercises);

            const result = await service.findAll();

            expect(prisma.exercise.findMany).toHaveBeenCalledWith({
                include: { workouts: true },
            });
            expect(result).toEqual(exercises);
        });
    });

    // --- FIND ONE ---
    describe('findOne', () => {
        it('should return a single exercise by id', async () => {
            const exercise = { id: 1, name: 'Bench', bodyPart: BodyPart.CHEST };
            (prisma.exercise.findUnique as jest.Mock).mockResolvedValue(exercise);

            const result = await service.findOne(1);

            expect(prisma.exercise.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: { workouts: true },
            });
            expect(result).toEqual(exercise);
        });

        it('should throw NotFoundException if not found', async () => {
            (prisma.exercise.findUnique as jest.Mock).mockResolvedValue(null);

            await expect(service.findOne(99)).rejects.toThrow(
                new NotFoundException('Exercise with id 99 not found'),
            );
        });
    });

    // --- UPDATE ---
    describe('update', () => {
        it('should update an exercise', async () => {
            const dto: UpdateExerciseDto = { name: 'Updated', bodyPart: BodyPart.SHOULDERS };
            const updated = { id: 1, ...dto };
            (prisma.exercise.update as jest.Mock).mockResolvedValue(updated);

            const result = await service.update(1, dto);

            expect(prisma.exercise.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: dto,
            });
            expect(result).toEqual(updated);
        });

        it('should throw NotFoundException if update fails', async () => {
            (prisma.exercise.update as jest.Mock).mockRejectedValue(new Error('Record not found'));

            await expect(service.update(99, { name: 'x', bodyPart: BodyPart.BACK })).rejects.toThrow(
                new NotFoundException('Exercise with id 99 not found'),
            );
        });
    });

    // --- REMOVE ---
    describe('remove', () => {
        it('should delete an exercise', async () => {
            const deleted = { id: 1, name: 'Bench', bodyPart: BodyPart.CHEST };
            (prisma.exercise.delete as jest.Mock).mockResolvedValue(deleted);

            const result = await service.remove(1);

            expect(prisma.exercise.delete).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toEqual(deleted);
        });

        it('should throw NotFoundException if delete fails', async () => {
            (prisma.exercise.delete as jest.Mock).mockRejectedValue(new Error('Record not found'));

            await expect(service.remove(99)).rejects.toThrow(
                new NotFoundException('Exercise with id 99 not found'),
            );
        });
    });
});
