import { createReducer } from "@reduxjs/toolkit";
import actionCreatorFactory from "typescript-fsa";
import {
  ExerciseDefinition,
  ExerciseDefinitionForCreate,
  ExerciseDefinitionForEdit,
} from "../constants/Interfaces";
import { BaseState } from "./base.reducer";

const actionCreator = actionCreatorFactory();

enum exerciseDefinitionTypes {
  GET_DEFINITIONS = "GET_DEFINITIONS",
  GET_DEFINITION_BY_ID = "GET_DEFINITION_BY_ID",
  CREATE_DEFINITION = "CREATE_DEFINITION",
  UPDATE_DEFINITION = "UPDATE_DEFINITION",
}

export type ExerciseDefinitionState = BaseState & {
  definitions: ExerciseDefinition[];
  definitionLoading: boolean;
  definitionsLoading: boolean;
  createDefinitionLoading: boolean;
  updateDefinitionLoading: boolean;
};

export const initialDefinitionState: ExerciseDefinitionState = {
  definitions: [],
  definitionLoading: false,
  definitionsLoading: false,
  createDefinitionLoading: false,
  updateDefinitionLoading: false,
  error: null,
};

export const requestDefinitions = actionCreator.async<
  undefined,
  Array<ExerciseDefinition>
>(exerciseDefinitionTypes.GET_DEFINITIONS);

export const requestDefinitionById = actionCreator.async<
  { id: string },
  ExerciseDefinition
>(exerciseDefinitionTypes.GET_DEFINITION_BY_ID);

export const createDefinition = actionCreator.async<
  { definition: ExerciseDefinitionForCreate },
  ExerciseDefinition
>(exerciseDefinitionTypes.CREATE_DEFINITION);

export const updateDefinition = actionCreator.async<
  { definition: ExerciseDefinitionForEdit },
  ExerciseDefinition
>(exerciseDefinitionTypes.CREATE_DEFINITION);

export const exerciseDefinitionReducer = createReducer(
  initialDefinitionState,
  (builder) => {
    // Request definitions
    builder.addCase(requestDefinitions.started, (state) => {
      state.definitionsLoading = true;
    });
    builder.addCase(requestDefinitions.done, (state, { payload }) => {
      state.definitions = payload.result;
      state.definitionsLoading = false;
    });
    builder.addCase(requestDefinitions.failed, (state, { payload }) => {
      state.definitionsLoading = false;
      state.error = `${payload}`;
    });
    // Request definition by ID
    builder.addCase(requestDefinitionById.started, (state) => {
      state.definitionLoading = true;
    });
    builder.addCase(
      requestDefinitionById.done,
      (state, { payload: { result } }) => {
        const definitions = [...state.definitions].filter(
          (x) => x.id !== result.id
        );
        state.definitions = [...definitions, result];
        state.definitionLoading = false;
      }
    );
    builder.addCase(requestDefinitionById.failed, (state, { payload }) => {
      state.definitionLoading = false;
      state.error = `${payload}`;
    });
    // Create definition
    builder.addCase(createDefinition.started, (state) => {
      state.createDefinitionLoading = true;
    });
    builder.addCase(createDefinition.done, (state, { payload }) => {
      state.definitions = [...state.definitions, payload.result];
      state.createDefinitionLoading = false;
    });
    builder.addCase(createDefinition.failed, (state, { payload }) => {
      state.createDefinitionLoading = false;
      state.error = `${payload}`;
    });
    // Update definition
    builder.addCase(updateDefinition.started, (state) => {
      state.updateDefinitionLoading = true;
    });
    builder.addCase(updateDefinition.done, (state, { payload: { result } }) => {
      const definitions = [...state.definitions].filter(
        (x) => x.id !== result.id
      );
      state.definitions = [...definitions, result];
      state.updateDefinitionLoading = false;
    });
    builder.addCase(updateDefinition.failed, (state, { payload }) => {
      state.updateDefinitionLoading = false;
      state.error = `${payload}`;
    });
  }
);
