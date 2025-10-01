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
exports.TrainingDayController = void 0;
const common_1 = require("@nestjs/common");
const training_day_service_1 = require("./training-day.service");
const create_training_day_dto_1 = require("./dto/create-training-day.dto");
const update_training_day_dto_1 = require("./dto/update-training-day.dto");
let TrainingDayController = class TrainingDayController {
    trainingDayService;
    constructor(trainingDayService) {
        this.trainingDayService = trainingDayService;
    }
    create(createDto) {
        return this.trainingDayService.create(createDto);
    }
    findAll() {
        return this.trainingDayService.findAll();
    }
    findOne(id) {
        return this.trainingDayService.findOne(+id);
    }
    update(id, updateDto) {
        return this.trainingDayService.update(+id, updateDto);
    }
    remove(id) {
        return this.trainingDayService.remove(+id);
    }
};
exports.TrainingDayController = TrainingDayController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_training_day_dto_1.CreateTrainingDayDto]),
    __metadata("design:returntype", void 0)
], TrainingDayController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrainingDayController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainingDayController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_training_day_dto_1.UpdateTrainingDayDto]),
    __metadata("design:returntype", void 0)
], TrainingDayController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainingDayController.prototype, "remove", null);
exports.TrainingDayController = TrainingDayController = __decorate([
    (0, common_1.Controller)('training-day'),
    __metadata("design:paramtypes", [training_day_service_1.TrainingDayService])
], TrainingDayController);
//# sourceMappingURL=training-day.controller.js.map