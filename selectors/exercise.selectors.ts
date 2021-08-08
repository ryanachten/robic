import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

export const isDefinitionExercisesLoading = createSelector(
  ({ exercise }: RootState) => exercise.exercisesLoading,
  (state) => state
);

export const isDeleteExerciseLoading = createSelector(
  ({ exercise }: RootState) => exercise.deleteExerciseLoading,
  (state) => state
);

export const getExercisesError = createSelector(
  ({ exercise }: RootState) => exercise.error,
  (state) => state
);

export const getExercises = createSelector(
  ({ exercise }: RootState) => exercise.exercises,
  (state) => state
);

export const getExercisesByDefinition = (definitionId: string) =>
  createSelector(getExercises, (exercises) =>
    exercises
      .filter((x) => x.definition === definitionId)
      .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
  );
