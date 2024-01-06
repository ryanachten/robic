import { components } from "../api/robic-swagger";
export { MuscleGroup } from "../api/robic-swagger";

export enum ExerciseType {
  Circuit = "Circuit",
  Standard = "Standard",
  Superset = "Superset",
}

export enum Unit {
  kg = "kg",
  min = "min",
  bodyweight = "bodyweight",
}

export type User = components["schemas"]["UserDetailDto"];

export interface SetExercise {
  id: string;
  reps: number;
  value: number;
  unit: Unit;
}

export type Set = {
  reps: number;
  value: number;
};

export type FormSet = {
  reps: string;
  value: string;
};

export type PersonalBestHistory = {
  date: string;
  netValue: number;
  avgValue: number;
  avgReps: number;
  sets: number;
  timeTaken: number;
};

// TODO: remove this after migration
export interface ExerciseOld {
  id: string;
  date: string;
  definition: string;
  sets: Set[];
  timeTaken: string;
  netValue: number;
}

export type Exercise = components["schemas"]["Exercise"];

export type ExerciseHistoryItem = components["schemas"]["ExerciseHistoryItem"];

export type ExerciseDefinitionSummary =
  components["schemas"]["ExerciseDefinitionSummary"];

export type ExerciseDefinition = components["schemas"]["ExerciseDefinition"];

export type UpdateExerciseDefinition =
  components["schemas"]["UpdateExerciseDefinitionDto"];

export type AnalyticsItem = {
  marker: string;
  count: number;
};

export interface Analytics {
  mostFrequentMuscleGroup: AnalyticsItem | null;
  mostFrequentExercise: AnalyticsItem | null;
  muscleGroupFrequency: AnalyticsItem[];
  exerciseFrequency: AnalyticsItem[];
  exerciseProgress: AnalyticsItem[];
}
