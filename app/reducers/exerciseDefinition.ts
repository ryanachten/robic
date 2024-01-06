import {
  ExerciseDefinition,
  ExerciseDefinitionSummary,
  UpdateExerciseDefinition,
} from "../constants/Interfaces";
import { BaseState, BaseActions, baseTypes } from "./base";
import { getErrorDetail } from "../utilities";
import client from "../api/client";

export enum exerciseDefinitionTypes {
  LOADING_DEFINITIONS = "LOADING_DEFINITIONS",
  GET_DEFINITIONS = "GET_DEFINITIONS",
  LOADING_DEFINITION = "LOADING_DEFINITION",
  GET_DEFINITION_BY_ID = "GET_DEFINITION_BY_ID",
  LOADING_CREATE_DEFINITION = "LOADING_CREATE_DEFINITION",
  CREATE_DEFINITION = "CREATE_DEFINITION",
  LOADING_UPDATE_DEFINITION = "LOADING_UPDATE_DEFINITION",
  UPDATE_DEFINITION = "UPDATE_DEFINITION",
}

export type ExerciseDefinitionState = BaseState & {
  definitionSummaries: ExerciseDefinitionSummary[];
  definitionDetail: ExerciseDefinition | null;
  loadingDefinitions: boolean;
  loadingDefinition: boolean;
  loadingSavingDefinition: boolean;
  loadingUpdateDefinition: boolean;
};

export type ExerciseDefinitionAction =
  | BaseActions
  | { type: exerciseDefinitionTypes.LOADING_DEFINITIONS }
  | {
      type: exerciseDefinitionTypes.GET_DEFINITIONS;
      definitions: ExerciseDefinitionSummary[];
    }
  | { type: exerciseDefinitionTypes.LOADING_DEFINITION }
  | {
      type: exerciseDefinitionTypes.GET_DEFINITION_BY_ID;
      definition: ExerciseDefinition;
    }
  | { type: exerciseDefinitionTypes.LOADING_CREATE_DEFINITION }
  | {
      type: exerciseDefinitionTypes.CREATE_DEFINITION;
      definition: ExerciseDefinition;
    }
  | { type: exerciseDefinitionTypes.LOADING_UPDATE_DEFINITION }
  | {
      type: exerciseDefinitionTypes.UPDATE_DEFINITION;
      definition: ExerciseDefinition;
    };

export type ExerciseDefinitionActions = {
  getDefinitions: () => Promise<void>;
  getDefinitionById: (id: number) => Promise<void>;
  createDefinition: (
    definition: UpdateExerciseDefinition
  ) => Promise<ExerciseDefinition | null>;
  editDefinition: (
    id: number,
    definition: UpdateExerciseDefinition
  ) => Promise<ExerciseDefinition | null>;
};

export const initialExerciseDefinitionState: ExerciseDefinitionState = {
  definitionSummaries: [],
  definitionDetail: null,
  loadingDefinitions: false,
  loadingDefinition: false,
  loadingSavingDefinition: false,
  loadingUpdateDefinition: false,
  error: null,
};

export const exerciseDefinitionActions = (
  dispatch: React.Dispatch<ExerciseDefinitionAction>
): ExerciseDefinitionActions => ({
  getDefinitions: async () => {
    dispatch({
      type: exerciseDefinitionTypes.LOADING_DEFINITIONS,
    });
    const { data, error } = await client.GET("/api/ExerciseDefinition");

    if (error) {
      const errorDetail = getErrorDetail(error);
      dispatch({ type: baseTypes.ERROR, error: errorDetail });
      return;
    }

    dispatch({
      type: exerciseDefinitionTypes.GET_DEFINITIONS,
      definitions: data,
    });
  },
  getDefinitionById: async (id: number) => {
    dispatch({
      type: exerciseDefinitionTypes.LOADING_DEFINITION,
    });

    const { data, error } = await client.GET("/api/ExerciseDefinition/{id}", {
      params: {
        path: {
          id,
        },
      },
    });

    if (error) {
      const errorDetail = getErrorDetail(error);
      dispatch({ type: baseTypes.ERROR, error: errorDetail });
      return;
    }

    dispatch({
      type: exerciseDefinitionTypes.GET_DEFINITION_BY_ID,
      definition: data,
    });
  },
  createDefinition: async (definition: UpdateExerciseDefinition) => {
    dispatch({
      type: exerciseDefinitionTypes.LOADING_CREATE_DEFINITION,
    });

    const { data, error } = await client.POST("/api/ExerciseDefinition", {
      body: definition,
    });

    if (error) {
      const errorDetail = getErrorDetail(error);
      dispatch({ type: baseTypes.ERROR, error: errorDetail });
      return null;
    }

    dispatch({
      type: exerciseDefinitionTypes.CREATE_DEFINITION,
      definition: data,
    });

    return data;
  },
  editDefinition: async (id: number, definition: UpdateExerciseDefinition) => {
    dispatch({
      type: exerciseDefinitionTypes.LOADING_UPDATE_DEFINITION,
    });

    const { data, error } = await client.PUT("/api/ExerciseDefinition/{id}", {
      params: {
        path: {
          id,
        },
      },
      body: definition,
    });

    if (error) {
      const errorDetail = getErrorDetail(error);
      dispatch({ type: baseTypes.ERROR, error: errorDetail });
      return null;
    }

    dispatch({
      type: exerciseDefinitionTypes.UPDATE_DEFINITION,
      definition: data,
    });
    return data;
  },
});

export const exerciseDefinitionReducer = (
  state: ExerciseDefinitionState,
  action: ExerciseDefinitionAction
): ExerciseDefinitionState => {
  switch (action.type) {
    case baseTypes.ERROR:
      return {
        ...state,
        loadingDefinition: false,
        loadingDefinitions: false,
        loadingUpdateDefinition: false,
        loadingSavingDefinition: false,
        error: action.error,
      };
    case exerciseDefinitionTypes.LOADING_DEFINITIONS:
      return {
        ...state,
        loadingDefinitions: true,
      };
    case exerciseDefinitionTypes.GET_DEFINITIONS:
      return {
        ...state,
        loadingDefinitions: false,
        definitionSummaries: [...action.definitions],
      };
    case exerciseDefinitionTypes.LOADING_DEFINITION:
      return {
        ...state,
        loadingDefinition: true,
      };
    case exerciseDefinitionTypes.GET_DEFINITION_BY_ID:
      return {
        ...state,
        loadingDefinition: false,
        definitionDetail: action.definition,
      };
    case exerciseDefinitionTypes.LOADING_CREATE_DEFINITION:
      return {
        ...state,
        loadingSavingDefinition: true,
      };
    case exerciseDefinitionTypes.CREATE_DEFINITION:
      return {
        ...state,
        loadingSavingDefinition: false,
        definitionDetail: action.definition,
      };
    case exerciseDefinitionTypes.LOADING_UPDATE_DEFINITION:
      return {
        ...state,
        loadingUpdateDefinition: true,
      };
    case exerciseDefinitionTypes.UPDATE_DEFINITION:
      return {
        ...state,
        loadingUpdateDefinition: false,
        definitionDetail: action.definition,
      };
    default:
      return state;
  }
};
