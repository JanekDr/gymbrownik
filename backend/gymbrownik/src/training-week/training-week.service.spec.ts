import { Test, TestingModule } from '@nestjs/testing';
import { TrainingWeekService } from './training-week.service';
import { DatabaseService } from 'src/database/database.service';
import { NotFoundException } from '@nestjs/common';
import { WorkoutType } from '@prisma/client';

describe('TrainingWeekService', () => {
    let service: TrainingWeekService;
    let database: DatabaseService;

    const mockDb = {
        trainingWeek: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TrainingWeekService,
                { provide: DatabaseService, useValue: mockDb },
            ],
        }).compile();

        service = module.get<TrainingWeekService>(TrainingWeekService);
        database = module.get<DatabaseService>(DatabaseService);
    });

    afterEach(() => jest.clearAllMocks());

    // --- CREATE ---
    describe('create', () => {
        it('should create a new training week', async () => {
            const dto = {
                name: 'Push Pull Legs Week 1',
                workoutType: WorkoutType.PUSH_PULL_LEGS,
                restDays: 1,
                trainingDays: 3,
                userId: 1,
            };
            const expected = { id: 1, ...dto };

            mockDb.trainingWeek.create.mockResolvedValue(expected);

            const result = await service.create(dto);

            expect(mockDb.trainingWeek.create).toHaveBeenCalledWith({
                data: {
                    name: dto.name,
                    workoutType: dto.workoutType,
                    restDays: dto.restDays,
                    trainingDays: dto.trainingDays,
                    user: { connect: { id: dto.userId } },
                },
                include: { user: true, days: true },
            });
            expect(result).toEqual(expected);
        });
    });

    // --- FIND ALL ---
    describe('findAll', () => {
        it('should return all training weeks', async () => {
            const weeks = [{ id: 1 }, { id: 2 }];
            mockDb.trainingWeek.findMany.mockResolvedValue(weeks);

            const result = await service.findAll();

            expect(mockDb.trainingWeek.findMany).toHaveBeenCalledWith({
                include: { user: true, days: { include: { workout: true } } },
                orderBy: { id: 'asc' },
            });
            expect(result).toEqual(weeks);
        });
    });

    // --- FIND ONE ---
    describe('findOne', () => {
        it('should return week if found', async () => {
            const week = { id: 1, name: 'Week 1' };
            mockDb.trainingWeek.findUnique.mockResolvedValue(week);

            const result = await service.findOne(1);

            expect(mockDb.trainingWeek.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: { user: true, days: { include: { workout: true } } },
            });
            expect(result).toEqual(week);
        });

        it('should throw NotFoundException if week not found', async () => {
            mockDb.trainingWeek.findUnique.mockResolvedValue(null);

            await expect(service.findOne(99)).rejects.toThrow(
                new NotFoundException('TrainingWeek 99 not found'),
            );
        });
    });

    // --- UPDATE ---
    describe('update', () => {
        it('should update training week if found', async () => {
            const existing = { id: 1 };
            const dto = {
                name: 'Updated Week',
                workoutType: WorkoutType.UPPER_LOWER,
                restDays: 2,
                trainingDays: 4,
                userId: 1,
            };
            const updated = { id: 1, ...dto };

            mockDb.trainingWeek.findUnique.mockResolvedValue(existing);
            mockDb.trainingWeek.update.mockResolvedValue(updated);

            const result = await service.update(1, dto);

            expect(mockDb.trainingWeek.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: {
                    name: dto.name,
                    workoutType: dto.workoutType,
                    restDays: dto.restDays,
                    trainingDays: dto.trainingDays,
                    user: { connect: { id: dto.userId } },
                },
                include: { user: true, days: { include: { workout: true } } },
            });
            expect(result).toEqual(updated);
        });

        it('should throw NotFoundException if week not found', async () => {
            mockDb.trainingWeek.findUnique.mockResolvedValue(null);

            await expect(
                service.update(1, { name: 'Test Week' }),
            ).rejects.toThrow(new NotFoundException('TrainingWeek 1 not found'));
        });
    });

    // --- REMOVE ---
    describe('remove', () => {
        it('should delete training week if found', async () => {
            const existing = { id: 1 };
            mockDb.trainingWeek.findUnique.mockResolvedValue(existing);
            mockDb.trainingWeek.delete.mockResolvedValue(undefined);

            const result = await service.remove(1);

            expect(mockDb.trainingWeek.delete).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toEqual({ message: 'TrainingWeek 1 deleted' });
        });

        it('should throw NotFoundException if not found', async () => {
            mockDb.trainingWeek.findUnique.mockResolvedValue(null);

            await expect(service.remove(123)).rejects.toThrow(
                new NotFoundException('TrainingWeek 123 not found'),
            );
        });
    });
});
