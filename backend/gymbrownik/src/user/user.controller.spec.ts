import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { OwnerOrAdminGuard } from '../auth/owner-or-admin.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;

    const mockService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                { provide: UserService, useValue: mockService },
                { provide: OwnerOrAdminGuard, useValue: { canActivate: jest.fn(() => true) } },
                { provide: AuthGuard('jwt'), useValue: jest.fn(() => true) },
                { provide: DatabaseService, useValue: {} },
                { provide: Reflector, useValue: { get: jest.fn() } },
                { provide: JwtService, useValue: { verify: jest.fn() } },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    afterEach(() => jest.clearAllMocks());

    // --- CREATE ---
    describe('create', () => {
        it('should create a new user', async () => {
            const dto = { email: 'test@example.com', name: 'John', password: 'secret123' };
            const expected = { id: 1, ...dto };
            mockService.create.mockResolvedValue(expected);

            const result = await controller.create(dto);

            expect(service.create).toHaveBeenCalledWith(dto);
            expect(result).toEqual(expected);
        });
    });

    // --- FIND ALL ---
    describe('findAll', () => {
        it('should return all users', async () => {
            const users = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
            mockService.findAll.mockResolvedValue(users);

            const result = await controller.findAll();

            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual(users);
        });
    });

    // --- FIND ONE ---
    describe('findOne', () => {
        it('should return user by ID', async () => {
            const user = { id: 1, name: 'John' };
            mockService.findOne.mockResolvedValue(user);

            const result = await controller.findOne(1);

            expect(service.findOne).toHaveBeenCalledWith(1);
            expect(result).toEqual(user);
        });
    });

    // --- UPDATE ---
    describe('update', () => {
        it('should update user by ID', async () => {
            const dto = { name: 'Updated User' };
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
