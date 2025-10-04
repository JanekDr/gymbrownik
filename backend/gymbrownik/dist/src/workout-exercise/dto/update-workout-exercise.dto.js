"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWorkoutExerciseDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_workout_exercise_dto_1 = require("./create-workout-exercise.dto");
class UpdateWorkoutExerciseDto extends (0, mapped_types_1.PartialType)(create_workout_exercise_dto_1.CreateWorkoutExerciseDto) {
}
exports.UpdateWorkoutExerciseDto = UpdateWorkoutExerciseDto;
//# sourceMappingURL=update-workout-exercise.dto.js.map