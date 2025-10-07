import { Test, TestingModule } from '@nestjs/testing';
import { TrainingDayController } from './training-day.controller';
import { TrainingDayService } from './training-day.service';
import { AuthGuard } from '@nestjs/passport';
import { OwnerOrAdminGuard } from '../auth/owner-or-admin.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';

describe('TrainingDayController', () => {
    let controller: TrainingDayController;
    let service: TrainingDayService;

    const mockService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
        analyzeVolumeBalanceForDay: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TrainingDayController],
            providers: [
                { provide: TrainingDayService, useValue: mockService },
                { provide: OwnerOrAdminGuard, useValue: { canActivate: jest.fn(() => true) } },
                { provide: AuthGuard('jwt'), useValue: jest.fn(() => true) },
                { provide: DatabaseService, useValue: {} },
                { provide: Reflector, useValue: { get: jest.fn() } },
                { provide: JwtService, useValue: { verify: jest.fn() } },
            ],
        }).compile();

        controller = module.get<TrainingDayController>(TrainingDayController);
        service = module.get<TrainingDayService>(TrainingDayService);
    });

    afterEach(() => jest.clearAllMocks());

    // --- CREATE ---
    describe('create', () => {
        it('should create a new training day', async () => {
            const dto = { dayOfWeek: 1, workoutId: 10, trainingWeekId: 5 };
            const expected = { id: 1, ...dto };
            mockService.create.mockResolvedValue(expected);

            const result = await controller.create(dto);

            expect(service.create).toHaveBeenCalledWith(dto);
            expect(result).toEqual(expected);
        });
    });

    // --- FIND ALL ---
    describe('findAll', () => {
        it('should return all training days', async () => {
            const days = [{ id: 1 }, { id: 2 }];
            mockService.findAll.mockResolvedValue(days);

            const result = await controller.findAll();

            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual(days);
        });
    });

    // --- FIND ONE ---
    describe('findOne', () => {
        it('should return a training day by ID', async () => {
            const day = { id: 1, dayOfWeek: 2 };
            mockService.findOne.mockResolvedValue(day);

            const result = await controller.findOne(1);

            expect(service.findOne).toHaveBeenCalledWith(1);
            expect(result).toEqual(day);
        });
    });

    // --- UPDATE ---
    describe('update', () => {
        it('should update a training day by ID', async () => {
            const dto = { workoutId: 99 };
            const updated = { id: 1, ...dto };
            mockService.update.mockResolvedValue(updated);

            const result = await controller.update(1, dto);

            expect(service.update).toHaveBeenCalledWith(1, dto);
            expect(result).toEqual(updated);
        });
    });

    // --- REMOVE ---
    describe('remove', () => {
        it('should call remove from service', async () => {
            mockService.remove.mockResolvedValue(undefined);

            const result = await controller.remove(1);

            expect(service.remove).toHaveBeenCalledWith(1);
            expect(result).toBeUndefined();
        });
    });

    // --- ANALYZE VOLUME BALANCE ---
    describe('analyzeVolumeBalanceForDay', () => {
        it('should analyze volume balance for a given day', async () => {
            const analysis = { balance: 'Good', muscles: ['Chest', 'Back'] };
            mockService.analyzeVolumeBalanceForDay.mockResolvedValue(analysis);

            const result = await controller.analyzeVolumeBalanceForDay(1);

            expect(service.analyzeVolumeBalanceForDay).toHaveBeenCalledWith(1);
            expect(result).toEqual(analysis);
        });
    });
});
