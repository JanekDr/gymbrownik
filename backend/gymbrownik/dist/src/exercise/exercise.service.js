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
exports.ExerciseService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ExerciseService = class ExerciseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.exercise.create({ data: dto });
    }
    async findAll() {
        return this.prisma.exercise.findMany({
            include: { workouts: true },
        });
    }
    async findOne(id) {
        const exercise = await this.prisma.exercise.findUnique({
            where: { id },
            include: { workouts: true },
        });
        if (!exercise) {
            throw new common_1.NotFoundException(`Exercise with id ${id} not found`);
        }
        return exercise;
    }
    async update(id, dto) {
        try {
            return await this.prisma.exercise.update({
                where: { id },
                data: dto,
            });
        }
        catch {
            throw new common_1.NotFoundException(`Exercise with id ${id} not found`);
        }
    }
    async remove(id) {
        try {
            return await this.prisma.exercise.delete({
                where: { id },
            });
        }
        catch {
            throw new common_1.NotFoundException(`Exercise with id ${id} not found`);
        }
    }
};
exports.ExerciseService = ExerciseService;
exports.ExerciseService = ExerciseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ExerciseService);
//# sourceMappingURL=exercise.service.js.map