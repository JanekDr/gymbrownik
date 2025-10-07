import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutExerciseService } from './workout-exercise.service';
import { DatabaseService } from '../database/database.service';
import { NotFoundException } from '@nestjs/common';

describe('WorkoutExerciseService', () => {
    let service: WorkoutExerciseService;
    let prisma: any;

    beforeEach(async () => {
        const prismaMock = {
            workoutExercise: {
                create: jest.fn(),
                findMany: jest.fn(),
                findUnique: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WorkoutExerciseService,
                { provide: DatabaseService, useValue: prismaMock },
            ],
        }).compile();

        service = module.get<WorkoutExerciseService>(WorkoutExerciseService);
        prisma = module.get<DatabaseService>(DatabaseService);
    });

    afterEach(() => jest.clearAllMocks());

    // --- getOrThrow ---
    describe('getOrThrow', () => {
        it('should return workout exercise if found', async () => {
            const expected = { id: 1, name: 'Bench Press' };
            prisma.workoutExercise.findUnique.mockResolvedValue(expected);

            const result = await (service as any).getOrThrow(1);

            expect(prisma.workoutExercise.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: {
                    workout: { select: { id: true, name: true } },
                    exercise: { select: { id: true, name: true } },
                },
            });
            expect(result).toEqual(expected);
        });

        it('should throw NotFoundException if not found', async () => {
            prisma.workoutExercise.findUnique.mockResolvedValue(null);
            await expect((service as any).getOrThrow(99)).rejects.toThrow(
                new NotFoundException('WorkoutExercise with ID 99 not found'),
            );
        });
    });

    // --- CREATE ---
    describe('create', () => {
        it('should create a workout exercise', async () => {
            const dto = {
                series: 4,
                reps: 10,
                weight: 80,
                rest: 90,
                workoutId: 1,
                exerciseId: 2,
            };
            const expected = { id: 1, ...dto };
            prisma.workoutExercise.create.mockResolvedValue(expected);

            const result = await service.create(dto);

            expect(prisma.workoutExercise.create).toHaveBeenCalledWith({
                data: expect.objectContaining({
                    series: dto.series,
                    reps: dto.reps,
                    weight: dto.weight,
                    rest: dto.rest,
                    workout: { connect: { id: dto.workoutId } },
                    exercise: { connect: { id: dto.exerciseId } },
                }),
                include: {
                    workout: { select: { id: true, name: true } },
                    exercise: { select: { id: true, name: true } },
                },
            });
            expect(result).toEqual(expected);
        });
    });

    // --- FIND ALL ---
    describe('findAll', () => {
        it('should return all workout exercises', async () => {
            const list = [{ id: 1 }, { id: 2 }];
            prisma.workoutExercise.findMany.mockResolvedValue(list);

            const result = await service.findAll();

            expect(prisma.workoutExercise.findMany).toHaveBeenCalledWith({
                include: {
                    workout: { select: { id: true, name: true } },
                    exercise: { select: { id: true, name: true } },
                },
                orderBy: { id: 'asc' },
            });
            expect(result).toEqual(list);
        });
    });

    // --- FIND ONE ---
    describe('findOne', () => {
        it('should return workout exercise by id', async () => {
            const found = { id: 1, name: 'Row' };
            jest.spyOn(service as any, 'getOrThrow').mockResolvedValue(found);

            const result = await service.findOne(1);

            expect((service as any).getOrThrow).toHaveBeenCalledWith(1);
            expect(result).toEqual(found);
        });
    });

    // --- UPDATE ---
    describe('update', () => {
        it('should update a workout exercise', async () => {
            const dto = { series: 5, reps: 12 };
            jest.spyOn(service as any, 'getOrThrow').mockResolvedValue({ id: 1 });
            const updated = { id: 1, ...dto };
            prisma.workoutExercise.update.mockResolvedValue(updated);

            const result = await service.update(1, dto);

            expect(prisma.workoutExercise.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: expect.objectContaining({
                    series: dto.series,
                    reps: dto.reps,
                }),
                include: {
                    workout: { select: { id: true, name: true } },
                    exercise: { select: { id: true, name: true } },
                },
            });
            expect(result).toEqual(updated);
        });
    });

    // --- UPDATE STATS ---
    describe('updateStats', () => {
        it('should update reps and weight, appending history', async () => {
            const existing = {
                id: 1,
                series: 3,
                reps: 8,
                weight: 60,
                history: [{ date: '2024-01-01', reps: 8, weight: 60 }],
                workout: { name: 'Push' },
                exercise: { name: 'Bench' },
            };

            jest.spyOn(service as any, 'getOrThrow').mockResolvedValue(existing);
            const updated = { id: 1, reps: 10, weight: 70 };
            prisma.workoutExercise.update.mockResolvedValue(updated);

            const result = await service.updateStats(1, 10, 70);

            expect(prisma.workoutExercise.update).toHaveBeenCalled();
            expect(result).toEqual(updated);
        });
    });

    // --- GET HISTORY ---
    describe('getHistory', () => {
        it('should return sorted history if present', async () => {
            const existing = {
                id: 1,
                history: [
                    { date: '2025-01-01', reps: 8, weight: 50 },
                    { date: '2025-02-01', reps: 10, weight: 55 },
                ],
                workout: { name: 'Push' },
                exercise: { name: 'Bench' },
            };

            jest.spyOn(service as any, 'getOrThrow').mockResolvedValue(existing);

            const result = await service.getHistory(1);

            expect(result.exerciseId).toBe(1);
            expect(result.totalEntries).toBe(2);
            expect(result.history[0].date).toBe('2025-02-01');
        });

        it('should return message if no history', async () => {
            const existing = { id: 1, history: [], workout: {}, exercise: {} };
            jest.spyOn(service as any, 'getOrThrow').mockResolvedValue(existing);

            const result = await service.getHistory(1);

            expect(result).toEqual({
                message: 'No history found for WorkoutExercise with ID 1',
                history: [],
            });
        });
    });

    // --- REMOVE ---
    describe('remove', () => {
        it('should delete workout exercise after verifying existence', async () => {
            jest.spyOn(service as any, 'getOrThrow').mockResolvedValue({ id: 1 });
            prisma.workoutExercise.delete.mockResolvedValue(undefined);

            const result = await service.remove(1);

            expect((service as any).getOrThrow).toHaveBeenCalledWith(1);
            expect(prisma.workoutExercise.delete).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toEqual({ message: 'WorkoutExercise 1 deleted' });
        });
    });
});
