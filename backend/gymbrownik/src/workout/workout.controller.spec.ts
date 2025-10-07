import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { AuthGuard } from '@nestjs/passport';
import { OwnerOrAdminGuard } from '../auth/owner-or-admin.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import { HttpStatus } from '@nestjs/common';

describe('WorkoutController', () => {
    let controller: WorkoutController;
    let service: WorkoutService;

    const mockWorkoutService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [WorkoutController],
            providers: [
                { provide: WorkoutService, useValue: mockWorkoutService },
                { provide: OwnerOrAdminGuard, useValue: { canActivate: jest.fn(() => true) } },
                { provide: AuthGuard('jwt'), useValue: jest.fn(() => true) },
                { provide: DatabaseService, useValue: {} },
                { provide: Reflector, useValue: { get: jest.fn() } },
                { provide: JwtService, useValue: { verify: jest.fn() } },
            ],
        }).compile();

        controller = module.get<WorkoutController>(WorkoutController);
        service = module.get<WorkoutService>(WorkoutService);
    });

    afterEach(() => jest.clearAllMocks());

    // --- CREATE ---
    describe('create', () => {
        it('should create a new workout', async () => {
            const dto = { name: 'Push Day' };
            const expected = { id: 1, ...dto };
            mockWorkoutService.create.mockResolvedValue(expected);

            const result = await controller.create(dto);

            expect(service.create).toHaveBeenCalledWith(dto);
            expect(result).toEqual(expected);
        });
    });

    // --- FIND ALL ---
    describe('findAll', () => {
        it('should return all workouts', async () => {
            const workouts = [
                { id: 1, name: 'Push' },
                { id: 2, name: 'Pull' },
            ];
            mockWorkoutService.findAll.mockResolvedValue(workouts);

            const result = await controller.findAll();

            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual(workouts);
        });
    });

    // --- FIND ONE ---
    describe('findOne', () => {
        it('should return workout by ID', async () => {
            const workout = { id: 1, name: 'Leg Day' };
            mockWorkoutService.findOne.mockResolvedValue(workout);

            const result = await controller.findOne(1);

            expect(service.findOne).toHaveBeenCalledWith(1);
            expect(result).toEqual(workout);
        });
    });

    // --- UPDATE ---
    describe('update', () => {
        it('should update workout by ID', async () => {
            const dto = { name: 'Updated Push Day' };
            const updated = { id: 1, ...dto };
            mockWorkoutService.update.mockResolvedValue(updated);

            const result = await controller.update(1, dto);

            expect(service.update).toHaveBeenCalledWith(1, dto);
            expect(result).toEqual(updated);
        });
    });

    // --- REMOVE ---
    describe('remove', () => {
        it('should call remove in service', async () => {
            mockWorkoutService.remove.mockResolvedValue(undefined);

            const result = await controller.remove(1);

            expect(service.remove).toHaveBeenCalledWith(1);
            expect(result).toBeUndefined();
        });
    });
});
