import { components } from "./robic-openapi";

/**
 * Proxies OpenAPI interfaces to make them easier to consume in the application
 */

export { MuscleGroup, Unit } from "./robic-openapi";

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

export type UserAnalytics = components["schemas"]["UserAnalytics"];

export type ProblemDetails = components["schemas"]["ProblemDetails"];
