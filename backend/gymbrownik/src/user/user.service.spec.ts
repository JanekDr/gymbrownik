import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseService } from 'src/database/database.service';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
}));

describe('UserService', () => {
    let service: UserService;
    let database: DatabaseService;

    const mockDb = {
        user: {
            findUnique: jest.fn(),
            findMany: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: DatabaseService, useValue: mockDb },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        database = module.get<DatabaseService>(DatabaseService);
    });

    afterEach(() => jest.clearAllMocks());

    // --- CREATE ---
    describe('create', () => {
        it('should hash password and create a new user', async () => {
            const dto = { email: 'test@example.com', name: 'John', password: 'secret' };
            const hashed = 'hashedPassword123';
            const expected = { id: 1, email: dto.email, name: dto.name, password: hashed };

            (bcrypt.hash as jest.Mock).mockResolvedValue(hashed);
            mockDb.user.create.mockResolvedValue(expected);

            const result = await service.create(dto);

            expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
            expect(mockDb.user.create).toHaveBeenCalledWith({
                data: { email: dto.email, name: dto.name, password: hashed },
                include: { trainingWeeks: true },
            });
            expect(result).toEqual(expected);
        });
    });

    // --- FIND ALL ---
    describe('findAll', () => {
        it('should return all users', async () => {
            const users = [{ id: 1 }, { id: 2 }];
            mockDb.user.findMany.mockResolvedValue(users);

            const result = await service.findAll();

            expect(mockDb.user.findMany).toHaveBeenCalledWith({
                include: { trainingWeeks: true },
                orderBy: { id: 'asc' },
            });
            expect(result).toEqual(users);
        });
    });

    // --- FIND ONE ---
    describe('findOne', () => {
        it('should return user if found', async () => {
            const user = { id: 1, name: 'John' };
            mockDb.user.findUnique.mockResolvedValue(user);

            const result = await service.findOne(1);

            expect(mockDb.user.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: { trainingWeeks: true },
            });
            expect(result).toEqual(user);
        });

        it('should throw NotFoundException if not found', async () => {
            mockDb.user.findUnique.mockResolvedValue(null);

            await expect(service.findOne(123)).rejects.toThrow(
                new NotFoundException('User with ID 123 not found'),
            );
        });
    });

    // --- UPDATE ---
    describe('update', () => {
        it('should update user if exists', async () => {
            const existing = { id: 1 };
            const dto = { email: 'updated@example.com', name: 'New Name' };
            const updated = { id: 1, ...dto };

            mockDb.user.findUnique.mockResolvedValue(existing);
            mockDb.user.update.mockResolvedValue(updated);

            const result = await service.update(1, dto);

            expect(mockDb.user.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { email: dto.email, name: dto.name },
                include: { trainingWeeks: true },
            });
            expect(result).toEqual(updated);
        });

        it('should throw NotFoundException if user not found', async () => {
            mockDb.user.findUnique.mockResolvedValue(null);

            await expect(service.update(99, { name: 'Ghost' })).rejects.toThrow(
                new NotFoundException('User with ID 99 not found'),
            );
        });
    });

    // --- REMOVE ---
    describe('remove', () => {
        it('should delete user if found', async () => {
            const existing = { id: 1 };
            mockDb.user.findUnique.mockResolvedValue(existing);
            mockDb.user.delete.mockResolvedValue(undefined);

            await service.remove(1);

            expect(mockDb.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        });

        it('should throw NotFoundException if user not found', async () => {
            mockDb.user.findUnique.mockResolvedValue(null);

            await expect(service.remove(123)).rejects.toThrow(
                new NotFoundException('User with ID 123 not found'),
            );
        });
    });
});
