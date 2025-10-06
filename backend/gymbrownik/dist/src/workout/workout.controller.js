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
exports.WorkoutController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const workout_service_1 = require("./workout.service");
const create_workout_dto_1 = require("./dto/create-workout.dto");
const update_workout_dto_1 = require("./dto/update-workout.dto");
const owner_or_admin_guard_1 = require("../auth/owner-or-admin.guard");
const passport_1 = require("@nestjs/passport");
const resource_decorator_1 = require("../auth/decorators/resource.decorator");
let WorkoutController = class WorkoutController {
    workoutService;
    constructor(workoutService) {
        this.workoutService = workoutService;
    }
    async create(createDto) {
        return this.workoutService.create(createDto);
    }
    async findAll() {
        return this.workoutService.findAll();
    }
    async findOne(id) {
        return this.workoutService.findOne(id);
    }
    async update(id, updateDto) {
        return this.workoutService.update(id, updateDto);
    }
    async remove(id) {
        await this.workoutService.remove(id);
    }
};
exports.WorkoutController = WorkoutController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new workout' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Workout created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_workout_dto_1.CreateWorkoutDto]),
    __metadata("design:returntype", Promise)
], WorkoutController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all workouts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of workouts retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorkoutController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get workout by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Workout details retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Workout not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkoutController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(owner_or_admin_guard_1.OwnerOrAdminGuard),
    (0, resource_decorator_1.Resource)('workout'),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update workout by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Workout updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Workout not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_workout_dto_1.UpdateWorkoutDto]),
    __metadata("design:returntype", Promise)
], WorkoutController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(owner_or_admin_guard_1.OwnerOrAdminGuard),
    (0, resource_decorator_1.Resource)('workout'),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete workout by ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Workout deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Workout not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkoutController.prototype, "remove", null);
exports.WorkoutController = WorkoutController = __decorate([
    (0, swagger_1.ApiTags)('workouts'),
    (0, common_1.Controller)('workout'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [workout_service_1.WorkoutService])
], WorkoutController);
//# sourceMappingURL=workout.controller.js.map