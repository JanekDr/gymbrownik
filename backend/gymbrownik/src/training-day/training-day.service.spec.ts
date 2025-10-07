import { Test, TestingModule } from '@nestjs/testing';
import { TrainingDayService } from './training-day.service';
import { DatabaseService } from '../database/database.service';
import { NotFoundException } from '@nestjs/common';

describe('TrainingDayService', () => {
    let service: TrainingDayService;
    let prisma: any;

    beforeEach(async () => {
        const prismaMock = {
            trainingDay: {
                findUnique: jest.fn(),
                findMany: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            },
            exercise: {
                findMany: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TrainingDayService,
                { provide: DatabaseService, useValue: prismaMock },
            ],
        }).compile();

        service = module.get<TrainingDayService>(TrainingDayService);
        prisma = module.get<DatabaseService>(DatabaseService);
    });

    afterEach(() => jest.clearAllMocks());

    // --- getTrainingDayOrThrow ---
    describe('getTrainingDayOrThrow', () => {
        it('should return training day if found', async () => {
            const td = { id: 1, dayOfWeek: 1 };
            prisma.trainingDay.findUnique.mockResolvedValue(td);

            const result = await (service as any).getTrainingDayOrThrow(1);

            expect(prisma.trainingDay.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: { trainingWeek: true, workout: true },
            });
            expect(result).toEqual(td);
        });

        it('should throw NotFoundException if not found', async () => {
            prisma.trainingDay.findUnique.mockResolvedValue(null);

            await expect((service as any).getTrainingDayOrThrow(99)).rejects.toThrow(
                new NotFoundException('TrainingDay with ID 99 not found'),
            );
        });
    });

    // --- CREATE ---
    describe('create', () => {
        it('should create a new training day', async () => {
            const dto = { dayOfWeek: 2, trainingWeekId: 1, workoutId: 5 };
            const expected = { id: 1, ...dto };
            prisma.trainingDay.create.mockResolvedValue(expected);

            const result = await service.create(dto);

            expect(prisma.trainingDay.create).toHaveBeenCalledWith({
                data: {
                    dayOfWeek: 2,
                    trainingWeek: { connect: { id: 1 } },
                    workout: { connect: { id: 5 } },
                },
                include: { trainingWeek: true, workout: true },
            });
            expect(result).toEqual(expected);
        });
    });

    // --- FIND ALL ---
    describe('findAll', () => {
        it('should return all training days ordered by dayOfWeek', async () => {
            const list = [{ id: 1 }, { id: 2 }];
            prisma.trainingDay.findMany.mockResolvedValue(list);

            const result = await service.findAll();

            expect(prisma.trainingDay.findMany).toHaveBeenCalledWith({
                include: { trainingWeek: true, workout: true },
                orderBy: { dayOfWeek: 'asc' },
            });
            expect(result).toEqual(list);
        });
    });

    // --- FIND ONE ---
    describe('findOne', () => {
        it('should return a training day by id', async () => {
            const td = { id: 1 };
            jest.spyOn(service as any, 'getTrainingDayOrThrow').mockResolvedValue(td);

            const result = await service.findOne(1);

            expect((service as any).getTrainingDayOrThrow).toHaveBeenCalledWith(1);
            expect(result).toEqual(td);
        });
    });

    // --- UPDATE ---
    describe('update', () => {
        it('should update training day', async () => {
            jest.spyOn(service as any, 'getTrainingDayOrThrow').mockResolvedValue({ id: 1 });
            const dto = { workoutId: 2 };
            const updated = { id: 1, workoutId: 2 };
            prisma.trainingDay.update.mockResolvedValue(updated);

            const result = await service.update(1, dto);

            expect(prisma.trainingDay.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: expect.objectContaining({
                    workout: { connect: { id: 2 } },
                }),
                include: { trainingWeek: true, workout: true },
            });
            expect(result).toEqual(updated);
        });
    });

    // --- ANALYZE VOLUME BALANCE ---
    describe('analyzeVolumeBalanceForDay', () => {
        it('should throw NotFoundException if training day not found', async () => {
            prisma.trainingDay.findUnique.mockResolvedValue(null);

            await expect(service.analyzeVolumeBalanceForDay(1)).rejects.toThrow(
                new NotFoundException('TrainingDay with ID 1 not found'),
            );
        });

        it('should return message if no imbalances detected', async () => {
            prisma.trainingDay.findUnique.mockResolvedValue({
                id: 1,
                workout: {
                    name: 'Push Day',
                    exercises: [
                        { series: 3, exercise: { bodyPart: 'CHEST' } },
                        { series: 3, exercise: { bodyPart: 'BACK' } },
                    ],
                },
            });

            const result = await service.analyzeVolumeBalanceForDay(1);

            expect(result.message).toContain('No significant imbalances');
            expect(result.summary).toEqual({ CHEST: 3, BACK: 3 });
        });

        it('should return imbalance details if difference >= 2', async () => {
            prisma.trainingDay.findUnique.mockResolvedValue({
                id: 1,
                workout: {
                    name: 'Leg Day',
                    exercises: [
                        { series: 5, exercise: { bodyPart: 'QUADRICEPS' } },
                        { series: 1, exercise: { bodyPart: 'HAMSTRINGS' } },
                    ],
                },
            });
            prisma.exercise.findMany.mockResolvedValue([
                { name: 'Leg Curl' },
                { name: 'Romanian Deadlift' },
            ]);

            const result = await service.analyzeVolumeBalanceForDay(1);

            expect(result.message).toContain('Imbalance detected');
            expect(result.details).toBeDefined();
            expect(result.details![0]).toEqual(
                expect.objectContaining({
                    comparison: 'HAMSTRINGS vs QUADRICEPS',
                    weakerPart: 'HAMSTRINGS',
                }),
            );

        });
    });

    // --- REMOVE ---
    describe('remove', () => {
        it('should delete training day after checking existence', async () => {
            jest.spyOn(service as any, 'getTrainingDayOrThrow').mockResolvedValue({ id: 1 });
            prisma.trainingDay.delete.mockResolvedValue(undefined);

            await service.remove(1);

            expect((service as any).getTrainingDayOrThrow).toHaveBeenCalledWith(1);
            expect(prisma.trainingDay.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        });
    });
});
