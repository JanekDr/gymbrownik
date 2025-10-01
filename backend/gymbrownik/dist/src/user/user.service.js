"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let UserService = class UserService {
    database;
    constructor(database) {
        this.database = database;
    }
    async getUserOrThrow(id) {
        const user = await this.database.user.findUnique({
            where: { id },
            include: { trainingWeeks: true },
        });
        if (user == null) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async create(dto) {
        return this.database.user.create({
            data: {
                email: dto.email,
                name: dto.name,
            },
            include: { trainingWeeks: true },
        });
    }
    async findAll() {
        return this.database.user.findMany({
            include: { trainingWeeks: true },
            orderBy: { id: "asc" },
        });
    }
    async findOne(id) {
        return this.getUserOrThrow(id);
    }
    async update(id, dto) {
        await this.getUserOrThrow(id);
        return this.database.user.update({
            where: { id },
            data: {
                ...(dto.email && { email: dto.email }),
                ...(dto.name && { name: dto.name }),
            },
            include: { trainingWeeks: true },
        });
    }
    async remove(id) {
        await this.getUserOrThrow(id);
        await this.database.user.delete({ where: { id } });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UserService);
//# sourceMappingURL=user.service.js.map