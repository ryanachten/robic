import { components } from "../api/robic-swagger";
export { MuscleGroup, Unit } from "../api/robic-swagger";

export type User = components["schemas"]["UserDetailDto"];

export type Set = components["schemas"]["Set"];

export type Exercise = components["schemas"]["Exercise"];

export type UpdateExercise = components["schemas"]["UpdateExerciseDto"];

export type ExerciseHistoryItem = components["schemas"]["ExerciseHistoryItem"];

export type ExerciseDefinitionSummary =
  components["schemas"]["ExerciseDefinitionSummary"];

export type ExerciseDefinition = components["schemas"]["ExerciseDefinition"];

export type UpdateExerciseDefinition =
  components["schemas"]["UpdateExerciseDefinitionDto"];

export type AnalyticsItem = components["schemas"]["AnalyticsItem"];

export type Analytics = components["schemas"]["Analytics"];
