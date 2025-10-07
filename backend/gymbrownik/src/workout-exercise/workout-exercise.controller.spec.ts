import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutExerciseController } from './workout-exercise.controller';
import { WorkoutExerciseService } from './workout-exercise.service';
import { AuthGuard } from '@nestjs/passport';
import { OwnerOrAdminGuard } from '../auth/owner-or-admin.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import 'reflect-metadata';

describe('WorkoutExerciseController', () => {
    let controller: WorkoutExerciseController;
    let service: WorkoutExerciseService;

    const mockService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        updateStats: jest.fn(),
        getHistory: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [WorkoutExerciseController],
            providers: [
                { provide: WorkoutExerciseService, useValue: mockService },
                { provide: OwnerOrAdminGuard, useValue: { canActivate: jest.fn(() => true) } },
                { provide: AuthGuard('jwt'), useValue: jest.fn(() => true) },
                { provide: DatabaseService, useValue: {} },
                { provide: Reflector, useValue: { get: jest.fn() } },
                { provide: JwtService, useValue: { verify: jest.fn() } },
            ],
        }).compile();

        controller = module.get<WorkoutExerciseController>(WorkoutExerciseController);
        service = module.get<WorkoutExerciseService>(WorkoutExerciseService);
    });

    afterEach(() => jest.clearAllMocks());

    // --- CREATE ---
    describe('create', () => {
        it('should create a new workout exercise', async () => {
            const dto = { workoutId: 1, exerciseId: 2, series: 3, reps: 10, weight: 50 };
            const expected = { id: 1, ...dto };
            mockService.create.mockResolvedValue(expected);

            const result = await controller.create(dto);

            expect(service.create).toHaveBeenCalledWith(dto);
            expect(result).toEqual(expected);
        });
    });

    // --- FIND ALL ---
    describe('findAll', () => {
        it('should return all workout exercises', async () => {
            const data = [{ id: 1 }, { id: 2 }];
            mockService.findAll.mockResolvedValue(data);

            const result = await controller.findAll();

            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual(data);
        });
    });

    // --- FIND ONE ---
    describe('findOne', () => {
        it('should return a workout exercise by ID', async () => {
            const expected = { id: 1, workoutId: 3, exerciseId: 5 };
            mockService.findOne.mockResolvedValue(expected);

            const result = await controller.findOne(1);

            expect(service.findOne).toHaveBeenCalledWith(1);
            expect(result).toEqual(expected);
        });
    });

    // --- UPDATE ---
    describe('update', () => {
        it('should update a workout exercise', async () => {
            const dto = { series: 4, reps: 12 };
            const expected = { id: 1, ...dto };
            mockService.update.mockResolvedValue(expected);

            const result = await controller.update(1, dto);

            expect(service.update).toHaveBeenCalledWith(1, dto);
            expect(result).toEqual(expected);
        });
    });

    // --- UPDATE STATS ---
    describe('updateStats', () => {
        it('should update stats and return updated exercise', async () => {
            const dto = { reps: 12, weight: 60 };
            const expected = { id: 1, reps: 12, weight: 60 };
            mockService.updateStats.mockResolvedValue(expected);

            const result = await controller.updateStats(1, dto);

            expect(service.updateStats).toHaveBeenCalledWith(1, dto.reps, dto.weight);
            expect(result).toEqual(expected);
        });
    });

    // --- GET HISTORY ---
    describe('getHistory', () => {
        it('should return exercise history', async () => {
            const history = [
                { date: '2025-10-06', reps: 10, weight: 50 },
                { date: '2025-10-01', reps: 8, weight: 55 },
            ];
            mockService.getHistory.mockResolvedValue(history);

            const result = await controller.getHistory(1);

            expect(service.getHistory).toHaveBeenCalledWith(1);
            expect(result).toEqual(history);
        });
    });

    // --- REMOVE ---
    describe('remove', () => {
        it('should delete workout exercise by ID', async () => {
            mockService.remove.mockResolvedValue(undefined);

            const result = await controller.remove(1);

            expect(service.remove).toHaveBeenCalledWith(1);
            expect(result).toBeUndefined();
        });
    });
});
