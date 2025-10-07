import { Test, TestingModule } from '@nestjs/testing';
import { TrainingWeekController } from './training-week.controller';
import { TrainingWeekService } from './training-week.service';
import { AuthGuard } from '@nestjs/passport';
import { OwnerOrAdminGuard } from '../auth/owner-or-admin.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import {WorkoutType} from "@prisma/client";

describe('TrainingWeekController', () => {
    let controller: TrainingWeekController;
    let service: TrainingWeekService;

    const mockService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TrainingWeekController],
            providers: [
                { provide: TrainingWeekService, useValue: mockService },
                { provide: OwnerOrAdminGuard, useValue: { canActivate: jest.fn(() => true) } },
                { provide: AuthGuard('jwt'), useValue: jest.fn(() => true) },
                { provide: DatabaseService, useValue: {} },
                { provide: Reflector, useValue: { get: jest.fn() } },
                { provide: JwtService, useValue: { verify: jest.fn() } },
            ],
        }).compile();

        controller = module.get<TrainingWeekController>(TrainingWeekController);
        service = module.get<TrainingWeekService>(TrainingWeekService);
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
            mockService.create.mockResolvedValue(expected);

            const result = await controller.create(dto);

            expect(service.create).toHaveBeenCalledWith(dto);
            expect(result).toEqual(expected);
        });
    });

    // --- FIND ALL ---
    describe('findAll', () => {
        it('should return all training weeks', async () => {
            const weeks = [{ id: 1 }, { id: 2 }];
            mockService.findAll.mockResolvedValue(weeks);

            const result = await controller.findAll();

            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual(weeks);
        });
    });

    // --- FIND ONE ---
    describe('findOne', () => {
        it('should return training week by ID', async () => {
            const week = { id: 1, name: 'Week 1' };
            mockService.findOne.mockResolvedValue(week);

            const result = await controller.findOne(1);

            expect(service.findOne).toHaveBeenCalledWith(1);
            expect(result).toEqual(week);
        });
    });

    // --- UPDATE ---
    describe('update', () => {
        it('should update training week by ID', async () => {
            const dto = { name: 'Updated Week' };
            const updated = { id: 1, ...dto };
            mockService.update.mockResolvedValue(updated);

            const result = await controller.update(1, dto);

            expect(service.update).toHaveBeenCalledWith(1, dto);
            expect(result).toEqual(updated);
        });
    });

    // --- REMOVE ---
    describe('remove', () => {
        it('should call remove in service', async () => {
            mockService.remove.mockResolvedValue(undefined);

            const result = await controller.remove(1);

            expect(service.remove).toHaveBeenCalledWith(1);
            expect(result).toBeUndefined();
        });
    });
});
