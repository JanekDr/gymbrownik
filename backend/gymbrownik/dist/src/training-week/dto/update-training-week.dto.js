"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTrainingWeekDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_training_week_dto_1 = require("./create-training-week.dto");
class UpdateTrainingWeekDto extends (0, mapped_types_1.PartialType)(create_training_week_dto_1.CreateTrainingWeekDto) {
}
exports.UpdateTrainingWeekDto = UpdateTrainingWeekDto;
//# sourceMappingURL=update-training-week.dto.js.map