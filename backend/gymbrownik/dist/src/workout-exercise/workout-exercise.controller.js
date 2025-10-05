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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutExerciseController = void 0;
const common_1 = require("@nestjs/common");
const workout_exercise_service_1 = require("./workout-exercise.service");
const create_workout_exercise_dto_1 = require("./dto/create-workout-exercise.dto");
const update_workout_exercise_dto_1 = require("./dto/update-workout-exercise.dto");
const update_stats_dto_1 = require("./dto/update-stats.dto");
const passport_1 = require("@nestjs/passport");
const owner_or_admin_guard_1 = require("../auth/owner-or-admin.guard");
let WorkoutExerciseController = class WorkoutExerciseController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(+id);
    }
    update(id, dto) {
        return this.service.update(+id, dto);
    }
    updateStats(id, dto) {
        return this.service.updateStats(+id, dto.reps, dto.weight);
    }
    getHistory(id) {
        return this.service.getHistory(+id);
    }
    remove(id) {
        return this.service.remove(+id);
    }
};
exports.WorkoutExerciseController = WorkoutExerciseController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_workout_exercise_dto_1.CreateWorkoutExerciseDto]),
    __metadata("design:returntype", void 0)
], WorkoutExerciseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WorkoutExerciseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkoutExerciseController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(owner_or_admin_guard_1.OwnerOrAdminGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_workout_exercise_dto_1.UpdateWorkoutExerciseDto]),
    __metadata("design:returntype", void 0)
], WorkoutExerciseController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(owner_or_admin_guard_1.OwnerOrAdminGuard),
    (0, common_1.Patch)(':id/stats'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stats_dto_1.UpdateStatsDto]),
    __metadata("design:returntype", void 0)
], WorkoutExerciseController.prototype, "updateStats", null);
__decorate([
    (0, common_1.UseGuards)(owner_or_admin_guard_1.OwnerOrAdminGuard),
    (0, common_1.Get)(':id/history'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkoutExerciseController.prototype, "getHistory", null);
__decorate([
    (0, common_1.UseGuards)(owner_or_admin_guard_1.OwnerOrAdminGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkoutExerciseController.prototype, "remove", null);
exports.WorkoutExerciseController = WorkoutExerciseController = __decorate([
    (0, common_1.Controller)('workout-exercise'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [workout_exercise_service_1.WorkoutExerciseService])
], WorkoutExerciseController);
//# sourceMappingURL=workout-exercise.controller.js.map