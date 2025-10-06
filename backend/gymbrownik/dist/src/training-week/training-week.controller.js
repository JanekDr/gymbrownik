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
exports.TrainingWeekController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const training_week_service_1 = require("./training-week.service");
const create_training_week_dto_1 = require("./dto/create-training-week.dto");
const update_training_week_dto_1 = require("./dto/update-training-week.dto");
const owner_or_admin_guard_1 = require("../auth/owner-or-admin.guard");
const passport_1 = require("@nestjs/passport");
const resource_decorator_1 = require("../auth/decorators/resource.decorator");
let TrainingWeekController = class TrainingWeekController {
    trainingWeekService;
    constructor(trainingWeekService) {
        this.trainingWeekService = trainingWeekService;
    }
    async create(createDto) {
        return this.trainingWeekService.create(createDto);
    }
    async findAll() {
        return this.trainingWeekService.findAll();
    }
    async findOne(id) {
        return this.trainingWeekService.findOne(id);
    }
    async update(id, updateDto) {
        return this.trainingWeekService.update(id, updateDto);
    }
    async remove(id) {
        await this.trainingWeekService.remove(id);
    }
};
exports.TrainingWeekController = TrainingWeekController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new training week' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Training week created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_training_week_dto_1.CreateTrainingWeekDto]),
    __metadata("design:returntype", Promise)
], TrainingWeekController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all training weeks' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of training weeks retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrainingWeekController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get training week by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Training week details retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Training week not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TrainingWeekController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(owner_or_admin_guard_1.OwnerOrAdminGuard),
    (0, resource_decorator_1.Resource)('trainingWeek'),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update training week by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Training week updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Training week not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_training_week_dto_1.UpdateTrainingWeekDto]),
    __metadata("design:returntype", Promise)
], TrainingWeekController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(owner_or_admin_guard_1.OwnerOrAdminGuard),
    (0, resource_decorator_1.Resource)('trainingWeek'),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete training week by ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Training week deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Training week not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TrainingWeekController.prototype, "remove", null);
exports.TrainingWeekController = TrainingWeekController = __decorate([
    (0, swagger_1.ApiTags)('training-weeks'),
    (0, common_1.Controller)('training-week'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [training_week_service_1.TrainingWeekService])
], TrainingWeekController);
//# sourceMappingURL=training-week.controller.js.map