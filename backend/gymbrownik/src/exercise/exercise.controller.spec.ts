import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { BodyPart } from '@prisma/client';
import { OwnerOrAdminGuard } from '../auth/owner-or-admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';

describe('ExerciseController', () => {
    let controller: ExerciseController;
    let service: ExerciseService;

    const mockExerciseService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExerciseController],
            providers: [
                {
                    provide: ExerciseService,
                    useValue: mockExerciseService,
                },
                // 👉 Dummy providery, żeby zaspokoić zależności guardów
                { provide: OwnerOrAdminGuard, useValue: { canActivate: jest.fn(() => true) } },
                { provide: AuthGuard('jwt'), useValue: jest.fn(() => true) },
                { provide: DatabaseService, useValue: {} },
                { provide: Reflector, useValue: { get: jest.fn() } },
                { provide: JwtService, useValue: { verify: jest.fn() } },
            ],
        }).compile();

        controller = module.get<ExerciseController>(ExerciseController);
        service = module.get<ExerciseService>(ExerciseService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // --- CREATE ---
    describe('create', () => {
        it('should create a new exercise', async () => {
            const dto: CreateExerciseDto = { name: 'Bench Press', bodyPart: BodyPart.CHEST };
            const expected = { id: 1, ...dto };
            mockExerciseService.create.mockResolvedValue(expected);

            const result = await controller.create(dto);

            expect(service.create).toHaveBeenCalledWith(dto);
            expect(result).toEqual(expected);
        });
    });

    // --- FIND ALL ---
    describe('findAll', () => {
        it('should return all exercises', async () => {
            const exercises = [
                { id: 1, name: 'Bench Press', bodyPart: BodyPart.CHEST },
                { id: 2, name: 'Squat', bodyPart: BodyPart.QUADRICEPS },
            ];
            mockExerciseService.findAll.mockResolvedValue(exercises);

            const result = await controller.findAll();

            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual(exercises);
        });
    });

    // --- FIND ONE ---
    describe('findOne', () => {
        it('should return exercise by ID', async () => {
            const exercise = { id: 1, name: 'Deadlift', bodyPart: BodyPart.BACK };
            mockExerciseService.findOne.mockResolvedValue(exercise);

            const result = await controller.findOne(1);

            expect(service.findOne).toHaveBeenCalledWith(1);
            expect(result).toEqual(exercise);
        });
    });

    // --- UPDATE ---
    describe('update', () => {
        it('should update exercise by ID', async () => {
            const dto: UpdateExerciseDto = { name: 'Updated Squat', bodyPart: BodyPart.QUADRICEPS };
            const expected = { id: 1, ...dto };
            mockExerciseService.update.mockResolvedValue(expected);

            const result = await controller.update(1, dto);

            expect(service.update).toHaveBeenCalledWith(1, dto);
            expect(result).toEqual(expected);
        });
    });

    // --- REMOVE ---
    describe('remove', () => {
        it('should remove exercise by ID', async () => {
            mockExerciseService.remove.mockResolvedValue(undefined);

            await controller.remove(1);

            expect(service.remove).toHaveBeenCalledWith(1);
        });
    });
});
