export declare class WorkoutExerciseInput {
    exerciseId: number;
    series: number;
    reps: number;
    weight: number;
    rest?: number;
}
export declare class CreateWorkoutDto {
    name: string;
    exercises?: WorkoutExerciseInput[];
}
