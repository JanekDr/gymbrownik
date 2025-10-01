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
exports.TrainingDayService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let TrainingDayService = class TrainingDayService {
    database;
    constructor(database) {
        this.database = database;
    }
    async getTrainingDayOrThrow(id) {
        const td = await this.database.trainingDay.findUnique({
            where: { id },
            include: { trainingWeek: true, workout: true },
        });
        if (td == null) {
            throw new common_1.NotFoundException(`TrainingDay with ID ${id} not found`);
        }
        return td;
    }
    async create(dto) {
        return this.database.trainingDay.create({
            data: {
                dayOfWeek: dto.dayOfWeek,
                trainingWeek: { connect: { id: dto.trainingWeekId } },
                workout: { connect: { id: dto.workoutId } },
            },
            include: { trainingWeek: true, workout: true },
        });
    }
    async findAll() {
        return this.database.trainingDay.findMany({
            include: { trainingWeek: true, workout: true },
            orderBy: { dayOfWeek: 'asc' },
        });
    }
    async findOne(id) {
        return this.getTrainingDayOrThrow(id);
    }
    async update(id, dto) {
        await this.getTrainingDayOrThrow(id);
        return this.database.trainingDay.update({
            where: { id },
            data: {
                ...(dto.dayOfWeek !== undefined && { dayOfWeek: dto.dayOfWeek }),
                ...(dto.trainingWeekId !== undefined && {
                    trainingWeek: { connect: { id: dto.trainingWeekId } },
                }),
                ...(dto.workoutId !== undefined && {
                    workout: { connect: { id: dto.workoutId } },
                }),
            },
            include: { trainingWeek: true, workout: true },
        });
    }
    async remove(id) {
        await this.getTrainingDayOrThrow(id);
        await this.database.trainingDay.delete({ where: { id } });
    }
};
exports.TrainingDayService = TrainingDayService;
exports.TrainingDayService = TrainingDayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], TrainingDayService);
//# sourceMappingURL=training-day.service.js.map