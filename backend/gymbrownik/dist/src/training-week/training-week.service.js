"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingWeekService = void 0;
const common_1 = require("@nestjs/common");
let TrainingWeekService = class TrainingWeekService {
    create(createTrainingWeekDto) {
        return 'This action adds a new trainingWeek';
    }
    findAll() {
        return `This action returns all trainingWeek`;
    }
    findOne(id) {
        return `This action returns a #${id} trainingWeek`;
    }
    update(id, updateTrainingWeekDto) {
        return `This action updates a #${id} trainingWeek`;
    }
    remove(id) {
        return `This action removes a #${id} trainingWeek`;
    }
};
exports.TrainingWeekService = TrainingWeekService;
exports.TrainingWeekService = TrainingWeekService = __decorate([
    (0, common_1.Injectable)()
], TrainingWeekService);
//# sourceMappingURL=training-week.service.js.map