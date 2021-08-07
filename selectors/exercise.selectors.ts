import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

export const isDefinitionExercisesLoading = createSelector(
  ({ exercise }: RootState) => exercise.exercisesLoading,
  (state) => state
);

export const getExercisesError = createSelector(
  ({ exercise }: RootState) => exercise.error,
  (state) => state
);
