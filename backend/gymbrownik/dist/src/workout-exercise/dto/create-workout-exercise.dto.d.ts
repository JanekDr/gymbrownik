declare class SetHistoryDto {
    reps: number;
    weight: number;
}
declare class SessionHistoryDto {
    date?: string;
    sets: SetHistoryDto[];
}
export declare class CreateWorkoutExerciseDto {
    series: number;
    reps: number;
    weight: number;
    rest?: number;
    history?: SessionHistoryDto[];
    workoutId: number;
    exerciseId: number;
}
export {};
