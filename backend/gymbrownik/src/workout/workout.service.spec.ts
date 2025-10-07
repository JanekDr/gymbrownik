import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutService } from './workout.service';
import { DatabaseService } from '../database/database.service';
import { NotFoundException } from '@nestjs/common';

describe('WorkoutService', () => {
    let service: WorkoutService;
    let prisma: any;

    beforeEach(async () => {
        const prismaMock = {
            workout: {
                findUnique: jest.fn(),
                create: jest.fn(),
                findMany: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WorkoutService,
                { provide: DatabaseService, useValue: prismaMock },
            ],
        }).compile();

        service = module.get<WorkoutService>(WorkoutService);
        prisma = module.get<DatabaseService>(DatabaseService);
    });

    afterEach(() => jest.clearAllMocks());

    // --- getWorkoutOrThrow ---
    describe('getWorkoutOrThrow', () => {
        it('should return a workout if found', async () => {
            const workout = { id: 1, name: 'Push Day' };
            prisma.workout.findUnique.mockResolvedValue(workout);

            const result = await (service as any).getWorkoutOrThrow(1);

            expect(prisma.workout.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: {
                    exercises: { include: { exercise: true } },
                    days: true,
                },
            });
            expect(result).toEqual(workout);
        });

        it('should throw NotFoundException if workout not found', async () => {
            prisma.workout.findUnique.mockResolvedValue(null);

            await expect((service as any).getWorkoutOrThrow(99)).rejects.toThrow(
                new NotFoundException('Workout with ID 99 not found'),
            );
        });
    });

    // --- CREATE ---
    describe('create', () => {
        it('should create a workout without exercises', async () => {
            const dto = { name: 'Leg Day' };
            const expected = { id: 1, name: 'Leg Day' };
            prisma.workout.create.mockResolvedValue(expected);

            const result = await service.create(dto);

            expect(prisma.workout.create).toHaveBeenCalledWith({
                data: { name: dto.name, exercises: undefined },
                include: {
                    exercises: { include: { exercise: true } },
                    days: true,
                },
            });
            expect(result).toEqual(expected);
        });

        it('should create a workout with exercises', async () => {
            const dto = {
                name: 'Push Day',
                exercises: [
                    { exerciseId: 1, series: 4, reps: 8, weight: 80, rest: 120 },
                    { exerciseId: 2, series: 3, reps: 10, weight: 60, rest: 90 },
                ],
            };
            const expected = { id: 2, name: 'Push Day' };
            prisma.workout.create.mockResolvedValue(expected);

            const result = await service.create(dto);

            expect(prisma.workout.create).toHaveBeenCalledWith({
                data: expect.objectContaining({
                    name: 'Push Day',
                    exercises: {
                        create: expect.arrayContaining([
                            expect.objectContaining({
                                series: 4,
                                reps: 8,
                                weight: 80,
                                rest: 120,
                                exercise: { connect: { id: 1 } },
                            }),
                            expect.objectContaining({
                                series: 3,
                                reps: 10,
                                weight: 60,
                                rest: 90,
                                exercise: { connect: { id: 2 } },
                            }),
                        ]),
                    },
                }),
                include: {
                    exercises: { include: { exercise: true } },
                    days: true,
                },
            });
            expect(result).toEqual(expected);
        });
    });

    // --- FIND ALL ---
    describe('findAll', () => {
        it('should return all workouts', async () => {
            const workouts = [{ id: 1 }, { id: 2 }];
            prisma.workout.findMany.mockResolvedValue(workouts);

            const result = await service.findAll();

            expect(prisma.workout.findMany).toHaveBeenCalledWith({
                include: {
                    exercises: { include: { exercise: true } },
                    days: true,
                },
                orderBy: { id: 'asc' },
            });
            expect(result).toEqual(workouts);
        });
    });

    // --- FIND ONE ---
    describe('findOne', () => {
        it('should return a workout by id', async () => {
            const workout = { id: 1, name: 'Chest Day' };
            jest.spyOn(service as any, 'getWorkoutOrThrow').mockResolvedValue(workout);

            const result = await service.findOne(1);

            expect((service as any).getWorkoutOrThrow).toHaveBeenCalledWith(1);
            expect(result).toEqual(workout);
        });
    });

    // --- UPDATE ---
    describe('update', () => {
        it('should update workout name', async () => {
            jest.spyOn(service as any, 'getWorkoutOrThrow').mockResolvedValue({ id: 1 });
            const dto = { name: 'Updated Push Day' };
            const updated = { id: 1, name: dto.name };
            prisma.workout.update.mockResolvedValue(updated);

            const result = await service.update(1, dto);

            expect(prisma.workout.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { name: dto.name },
                include: {
                    exercises: { include: { exercise: true } },
                    days: true,
                },
            });
            expect(result).toEqual(updated);
        });
    });

    // --- REMOVE ---
    describe('remove', () => {
        it('should delete workout after verifying existence', async () => {
            jest.spyOn(service as any, 'getWorkoutOrThrow').mockResolvedValue({ id: 1 });
            prisma.workout.delete.mockResolvedValue(undefined);

            const result = await service.remove(1);

            expect((service as any).getWorkoutOrThrow).toHaveBeenCalledWith(1);
            expect(prisma.workout.delete).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toEqual({ message: 'Workout with ID 1 removed' });
        });
    });
});
