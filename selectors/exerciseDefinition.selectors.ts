import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";
import { sortAlpha } from "../utilities/searchHelpers";

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

export const isUpdateDefinitionLoading = createSelector(
  ({ exerciseDefinition }: RootState) =>
    exerciseDefinition.updateDefinitionLoading,
  (state) => state
);

export const getDefinitionError = createSelector(
  (state: RootState) => state.exerciseDefinition.error,
  (state) => state
);

export const getDefinitions = createSelector(
  ({ exerciseDefinition }: RootState) => {
    return [...exerciseDefinition.definitions];
  },
  (state) => state
);

export const getSortedDefintionsByTitle = createSelector(
  getDefinitions,
  (defintions) => defintions.sort(sortAlpha)
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
