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
exports.WorkoutService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let WorkoutService = class WorkoutService {
    database;
    constructor(database) {
        this.database = database;
    }
    async getWorkoutOrThrow(id) {
        const workout = await this.database.workout.findUnique({
            where: { id },
            include: {
                exercises: { include: { exercise: true } },
                days: true,
            },
        });
        if (!workout) {
            throw new common_1.NotFoundException(`Workout with ID ${id} not found`);
        }
        return workout;
    }
    async create(dto) {
        return this.database.workout.create({
            data: {
                name: dto.name,
                exercises: dto.exercises
                    ? {
                        create: dto.exercises.map((e) => ({
                            series: e.series,
                            reps: e.reps,
                            weight: e.weight,
                            rest: e.rest,
                            exercise: { connect: { id: e.exerciseId } },
                        })),
                    }
                    : undefined,
            },
            include: { exercises: { include: { exercise: true } }, days: true },
        });
    }
    async findAll() {
        return this.database.workout.findMany({
            include: { exercises: { include: { exercise: true } }, days: true },
            orderBy: { id: 'asc' },
        });
    }
    async findOne(id) {
        return this.getWorkoutOrThrow(id);
    }
    async update(id, dto) {
        await this.getWorkoutOrThrow(id);
        return this.database.workout.update({
            where: { id },
            data: {
                ...(dto.name && { name: dto.name }),
            },
            include: { exercises: { include: { exercise: true } }, days: true },
        });
    }
    async remove(id) {
        await this.getWorkoutOrThrow(id);
        await this.database.workout.delete({ where: { id } });
        return { message: `Workout with ID ${id} removed` };
    }
};
exports.WorkoutService = WorkoutService;
exports.WorkoutService = WorkoutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], WorkoutService);
//# sourceMappingURL=workout.service.js.map