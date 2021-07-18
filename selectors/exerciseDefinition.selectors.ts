import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

export const isDefinitionsLoading = createSelector(
  ({ exerciseDefinition }: RootState) => exerciseDefinition.definitionsLoading,
  (state) => state
);

export const isDefinitionLoading = createSelector(
  ({ exerciseDefinition }: RootState) => exerciseDefinition.definitionLoading,
  (state) => state
);

export const isCreateDefinitionLoading = createSelector(
  ({ exerciseDefinition }: RootState) =>
    exerciseDefinition.createDefinitionLoading,
  (state) => state
);

export const getDefinitionError = createSelector(
  ({ exerciseDefinition }: RootState) => exerciseDefinition.error,
  (state) => state
);

export const getDefinitions = createSelector(
  ({ exerciseDefinition }: RootState) => exerciseDefinition.definitions,
  (state) => state
);

export const getDefinitionById = (id: string) =>
  createSelector(
    ({ exerciseDefinition }: RootState) =>
      exerciseDefinition.definitions.find((x) => x.id === id),
    (state) => state
  );

export const getDefinitionByTitle = (title: string) =>
  createSelector(
    ({ exerciseDefinition }: RootState) =>
      exerciseDefinition.definitions.find((x) => x.title === title),
    (state) => state
  );
