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
const training_week_service_1 = require("./training-week.service");
const create_training_week_dto_1 = require("./dto/create-training-week.dto");
const update_training_week_dto_1 = require("./dto/update-training-week.dto");
const owner_or_admin_guard_1 = require("../auth/owner-or-admin.guard");
const passport_1 = require("@nestjs/passport");
let TrainingWeekController = class TrainingWeekController {
    trainingWeekService;
    constructor(trainingWeekService) {
        this.trainingWeekService = trainingWeekService;
    }
    create(createDto) {
        return this.trainingWeekService.create(createDto);
    }
    findAll() {
        return this.trainingWeekService.findAll();
    }
    findOne(id) {
        return this.trainingWeekService.findOne(+id);
    }
    update(id, updateDto) {
        return this.trainingWeekService.update(+id, updateDto);
    }
    remove(id) {
        return this.trainingWeekService.remove(+id);
    }
};
exports.TrainingWeekController = TrainingWeekController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_training_week_dto_1.CreateTrainingWeekDto]),
    __metadata("design:returntype", void 0)
], TrainingWeekController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrainingWeekController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainingWeekController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(owner_or_admin_guard_1.OwnerOrAdminGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_training_week_dto_1.UpdateTrainingWeekDto]),
    __metadata("design:returntype", void 0)
], TrainingWeekController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(owner_or_admin_guard_1.OwnerOrAdminGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainingWeekController.prototype, "remove", null);
exports.TrainingWeekController = TrainingWeekController = __decorate([
    (0, common_1.Controller)('training-week'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [training_week_service_1.TrainingWeekService])
], TrainingWeekController);
//# sourceMappingURL=training-week.controller.js.map