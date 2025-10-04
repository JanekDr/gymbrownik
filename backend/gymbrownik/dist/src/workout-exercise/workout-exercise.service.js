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
exports.WorkoutExerciseService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let WorkoutExerciseService = class WorkoutExerciseService {
    database;
    constructor(database) {
        this.database = database;
    }
    async getOrThrow(id) {
        const exercise = await this.database.workoutExercise.findUnique({
            where: { id },
            include: {
                workout: { select: { id: true, name: true } },
                exercise: { select: { id: true, name: true } },
            },
        });
        if (!exercise)
            throw new common_1.NotFoundException(`WorkoutExercise with ID ${id} not found`);
        return exercise;
    }
    async create(dto) {
        return this.database.workoutExercise.create({
            data: {
                series: dto.series,
                reps: dto.reps,
                weight: dto.weight,
                rest: dto.rest,
                history: dto.history ? JSON.parse(JSON.stringify(dto.history)) : [],
                workout: { connect: { id: dto.workoutId } },
                exercise: { connect: { id: dto.exerciseId } },
            },
            include: {
                workout: { select: { id: true, name: true } },
                exercise: { select: { id: true, name: true } },
            },
        });
    }
    async findAll() {
        return this.database.workoutExercise.findMany({
            include: {
                workout: { select: { id: true, name: true } },
                exercise: { select: { id: true, name: true } },
            },
            orderBy: { id: 'asc' },
        });
    }
    async findOne(id) {
        return this.getOrThrow(id);
    }
    async update(id, dto) {
        await this.getOrThrow(id);
        return this.database.workoutExercise.update({
            where: { id },
            data: {
                ...(dto.series && { series: dto.series }),
                ...(dto.reps && { reps: dto.reps }),
                ...(dto.weight && { weight: dto.weight }),
                ...(dto.rest !== undefined && { rest: dto.rest }),
                ...(dto.history && { history: JSON.parse(JSON.stringify(dto.history)) }),
                ...(dto.workoutId && { workout: { connect: { id: dto.workoutId } } }),
                ...(dto.exerciseId && { exercise: { connect: { id: dto.exerciseId } } }),
            },
            include: {
                workout: { select: { id: true, name: true } },
                exercise: { select: { id: true, name: true } },
            },
        });
    }
    async updateStats(id, reps, weight) {
        const existing = await this.getOrThrow(id);
        const history = Array.isArray(existing.history) ? existing.history : [];
        history.push({
            date: new Date().toISOString(),
            series: existing.series,
            reps: existing.reps,
            weight: Number(existing.weight),
        });
        return this.database.workoutExercise.update({
            where: { id },
            data: {
                reps,
                weight,
                history,
            },
            include: {
                workout: { select: { id: true, name: true } },
                exercise: { select: { id: true, name: true } },
            },
        });
    }
    async getHistory(id) {
        const exercise = await this.getOrThrow(id);
        if (!exercise.history || (Array.isArray(exercise.history) && exercise.history.length === 0)) {
            return {
                message: `No history found for WorkoutExercise with ID ${id}`,
                history: [],
            };
        }
        const sortedHistory = [...exercise.history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return {
            exerciseId: exercise.id,
            exerciseName: exercise.exercise.name,
            workoutName: exercise.workout.name,
            totalEntries: sortedHistory.length,
            history: sortedHistory,
        };
    }
    async remove(id) {
        await this.getOrThrow(id);
        await this.database.workoutExercise.delete({ where: { id } });
        return { message: `WorkoutExercise ${id} deleted` };
    }
};
exports.WorkoutExerciseService = WorkoutExerciseService;
exports.WorkoutExerciseService = WorkoutExerciseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], WorkoutExerciseService);
//# sourceMappingURL=workout-exercise.service.js.map