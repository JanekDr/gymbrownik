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
exports.TrainingWeekService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let TrainingWeekService = class TrainingWeekService {
    database;
    constructor(database) {
        this.database = database;
    }
    async getWeekOrThrow(id) {
        const week = await this.database.trainingWeek.findUnique({
            where: { id },
            include: { user: true, days: { include: { workout: true } } },
        });
        if (!week)
            throw new common_1.NotFoundException(`TrainingWeek ${id} not found`);
        return week;
    }
    async create(dto) {
        return this.database.trainingWeek.create({
            data: {
                name: dto.name,
                workoutType: dto.workoutType,
                restDays: dto.restDays,
                trainingDays: dto.trainingDays,
                user: { connect: { id: dto.userId } },
            },
            include: { user: true, days: true },
        });
    }
    async findAll() {
        return this.database.trainingWeek.findMany({
            include: { user: true, days: { include: { workout: true } } },
            orderBy: { id: 'asc' },
        });
    }
    async findOne(id) {
        return this.getWeekOrThrow(id);
    }
    async update(id, dto) {
        await this.getWeekOrThrow(id);
        return this.database.trainingWeek.update({
            where: { id },
            data: {
                ...(dto.name && { name: dto.name }),
                ...(dto.workoutType && { workoutType: dto.workoutType }),
                ...(dto.restDays !== undefined && { restDays: dto.restDays }),
                ...(dto.trainingDays !== undefined && { trainingDays: dto.trainingDays }),
                ...(dto.userId && { user: { connect: { id: dto.userId } } }),
            },
            include: { user: true, days: { include: { workout: true } } },
        });
    }
    async remove(id) {
        await this.getWeekOrThrow(id);
        await this.database.trainingWeek.delete({ where: { id } });
        return { message: `TrainingWeek ${id} deleted` };
    }
};
exports.TrainingWeekService = TrainingWeekService;
exports.TrainingWeekService = TrainingWeekService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], TrainingWeekService);
//# sourceMappingURL=training-week.service.js.map