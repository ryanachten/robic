import { Exercise, Set } from "../constants/Interfaces";
import { BaseState } from "./base.reducer";
import { createReducer } from "@reduxjs/toolkit";
import {
  createExercise,
  deleteExercise,
  requestDefinitionExercises,
} from "../actions";

export type ExerciseForCreate = {
  definition: string;
  sets: Set[];
  timeTaken?: string;
};

export enum exerciseTypes {
  GET_EXERCISES_BY_DEFINITION = "GET_EXERCISES_BY_DEFINITION",
  CREATE_EXERCISE = "CREATE_EXERCISE",
  DELETE_EXERCISE = "DELETE_EXERCISE",
}

export type ExerciseState = BaseState & {
  exercises: Exercise[];
  exercisesLoading: boolean;
  createExerciseLoading: boolean;
  deleteExerciseLoading: boolean;
};

export const initialExerciseState: ExerciseState = {
  exercises: [],
  exercisesLoading: false,
  createExerciseLoading: false,
  deleteExerciseLoading: false,
  error: null,
};

export const exerciseReducer = createReducer(
  initialExerciseState,
  (builder) => {
    // Request definition exercises
    builder.addCase(requestDefinitionExercises.started, (state) => {
      state.exercisesLoading = true;
    });
    builder.addCase(requestDefinitionExercises.done, (state, { payload }) => {
      state.exercises = payload.result;
      state.exercisesLoading = false;
    });
    builder.addCase(requestDefinitionExercises.failed, (state, { payload }) => {
      state.exercisesLoading = false;
      state.error = `${payload}`;
    });
    // Create exercise
    builder.addCase(createExercise.started, (state) => {
      state.createExerciseLoading = true;
    });
    builder.addCase(createExercise.done, (state, { payload }) => {
      state.exercises = [...state.exercises, payload.result];
      state.exercisesLoading = false;
    });
    builder.addCase(createExercise.failed, (state, { payload }) => {
      state.exercisesLoading = false;
      state.error = `${payload}`;
    });
    // Delete exercise
    builder.addCase(deleteExercise.started, (state) => {
      state.deleteExerciseLoading = true;
    });
    builder.addCase(deleteExercise.done, (state, { payload }) => {
      state.exercises = [
        ...state.exercises.filter((x) => x.id !== payload.result.exerciseId),
      ];
      state.exercisesLoading = false;
    });
    builder.addCase(deleteExercise.failed, (state, { payload }) => {
      state.deleteExerciseLoading = false;
      state.error = `${payload}`;
    });
  }
);
