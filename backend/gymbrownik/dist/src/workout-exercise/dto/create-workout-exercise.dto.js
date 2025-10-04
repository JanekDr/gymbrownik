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
exports.CreateWorkoutExerciseDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class SetHistoryDto {
    reps;
    weight;
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SetHistoryDto.prototype, "reps", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SetHistoryDto.prototype, "weight", void 0);
class SessionHistoryDto {
    date;
    sets;
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SessionHistoryDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SetHistoryDto),
    __metadata("design:type", Array)
], SessionHistoryDto.prototype, "sets", void 0);
class CreateWorkoutExerciseDto {
    series;
    reps;
    weight;
    rest;
    history;
    workoutId;
    exerciseId;
}
exports.CreateWorkoutExerciseDto = CreateWorkoutExerciseDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateWorkoutExerciseDto.prototype, "series", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateWorkoutExerciseDto.prototype, "reps", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateWorkoutExerciseDto.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateWorkoutExerciseDto.prototype, "rest", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SessionHistoryDto),
    __metadata("design:type", Array)
], CreateWorkoutExerciseDto.prototype, "history", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateWorkoutExerciseDto.prototype, "workoutId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateWorkoutExerciseDto.prototype, "exerciseId", void 0);
//# sourceMappingURL=create-workout-exercise.dto.js.map