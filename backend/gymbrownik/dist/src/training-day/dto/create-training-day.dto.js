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
exports.CreateTrainingDayDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateTrainingDayDto {
    dayOfWeek;
    trainingWeekId;
    workoutId;
}
exports.CreateTrainingDayDto = CreateTrainingDayDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Day of the week for the training session (1 = Monday, 7 = Sunday)',
        example: 3,
        minimum: 1,
        maximum: 7,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(7),
    __metadata("design:type", Number)
], CreateTrainingDayDto.prototype, "dayOfWeek", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the training week this day belongs to',
        example: 1,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTrainingDayDto.prototype, "trainingWeekId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the workout assigned to this day',
        example: 5,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTrainingDayDto.prototype, "workoutId", void 0);
//# sourceMappingURL=create-training-day.dto.js.map