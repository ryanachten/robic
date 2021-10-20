import { ExerciseDefinition, MuscleGroup, Unit } from "../constants/Interfaces";
import Axios, { AxiosResponse } from "axios";
import { EXERCISE_DEFINITION_URL } from "../constants/Api";
import { BaseState, BaseActions, baseTypes } from "./base";

export type ExerciseDefinitionForCreate = {
  title: string;
  unit: Unit;
  user: string;
  primaryMuscleGroup: MuscleGroup[];
};

export type ExerciseDefinitionForEdit = {
  id: string;
  title: string;
  unit: Unit;
  primaryMuscleGroup: MuscleGroup[];
};

export enum exerciseDefinitionTypes {
  GET_DEFINITIONS = "GET_DEFINITIONS",
  LOADING_DEFINITIONS = "LOADING_DEFINITIONS",
  GET_DEFINITION_BY_ID = "GET_DEFINITION_BY_ID",
  LOADING_DEFINITION = "LOADING_DEFINITION",
  CREATE_DEFINITION = "CREATE_DEFINITION",
  SAVING_DEFINITION = "SAVING_DEFINITION",
  UPDATE_DEFINITION = "UPDATE_DEFINITION",
  UPDATING_DEFINITION = "UPDATING_DEFINITION",
}

export type ExerciseDefinitionState = BaseState & {
  definitions: ExerciseDefinition[];
  loadingDefinitions: boolean;
  loadingDefinition: boolean;
  savingDefinition: boolean;
  updatingDefinition: boolean;
};

export type ExerciseDefinitionAction =
  | BaseActions
  | { type: exerciseDefinitionTypes.LOADING_DEFINITIONS }
  | {
      type: exerciseDefinitionTypes.GET_DEFINITIONS;
      definitions: ExerciseDefinition[];
    }
  | { type: exerciseDefinitionTypes.LOADING_DEFINITION }
  | {
      type: exerciseDefinitionTypes.GET_DEFINITION_BY_ID;
      definition: ExerciseDefinition;
    }
  | { type: exerciseDefinitionTypes.SAVING_DEFINITION }
  | {
      type: exerciseDefinitionTypes.CREATE_DEFINITION;
      definition: ExerciseDefinition;
    }
  | { type: exerciseDefinitionTypes.UPDATING_DEFINITION }
  | {
      type: exerciseDefinitionTypes.UPDATE_DEFINITION;
      definition: ExerciseDefinition;
    };

export type ExerciseDefinitionActions = {
  getDefinitions: () => Promise<void>;
  getDefinitionById: (id: string) => Promise<void>;
  createDefinition: (
    definition: ExerciseDefinitionForCreate
  ) => Promise<ExerciseDefinition | null>;
  editDefinition: (
    definition: ExerciseDefinitionForEdit
  ) => Promise<ExerciseDefinition | null>;
};

export const initialExerciseDefinitionState: ExerciseDefinitionState = {
  definitions: [],
  // loading: false,
  loadingDefinitions: false,
  loadingDefinition: false,
  savingDefinition: false,
  updatingDefinition: false,
  error: null,
};

export const exerciseDefinitionActions = (
  dispatch: React.Dispatch<ExerciseDefinitionAction>
): ExerciseDefinitionActions => ({
  getDefinitions: async () => {
    dispatch({
      type: exerciseDefinitionTypes.LOADING_DEFINITIONS,
    });
    try {
      const { data }: AxiosResponse<ExerciseDefinition[]> = await Axios.get(
        EXERCISE_DEFINITION_URL
      );
      dispatch({
        type: exerciseDefinitionTypes.GET_DEFINITIONS,
        definitions: data,
      });
    } catch (e) {
      dispatch({ type: baseTypes.ERROR, error: e.message });
    }
  },
  getDefinitionById: async (id: string) => {
    dispatch({
      type: exerciseDefinitionTypes.LOADING_DEFINITION,
    });
    try {
      const { data }: AxiosResponse<ExerciseDefinition> = await Axios.get(
        `${EXERCISE_DEFINITION_URL}/${id}`
      );

      dispatch({
        type: exerciseDefinitionTypes.GET_DEFINITION_BY_ID,
        definition: data,
      });
    } catch (e) {
      dispatch({ type: baseTypes.ERROR, error: e.message });
    }
  },
  createDefinition: async (definition: ExerciseDefinitionForCreate) => {
    dispatch({
      type: exerciseDefinitionTypes.SAVING_DEFINITION,
    });
    try {
      const { data }: AxiosResponse<ExerciseDefinition> = await Axios.post(
        EXERCISE_DEFINITION_URL,
        definition
      );
      dispatch({
        type: exerciseDefinitionTypes.CREATE_DEFINITION,
        definition: data,
      });
      return data;
    } catch (e) {
      dispatch({ type: baseTypes.ERROR, error: e.message });
      return null;
    }
  },
  editDefinition: async (definition: ExerciseDefinitionForEdit) => {
    dispatch({
      type: exerciseDefinitionTypes.UPDATING_DEFINITION,
    });
    try {
      const { data }: AxiosResponse<ExerciseDefinition> = await Axios.put(
        `${EXERCISE_DEFINITION_URL}/${definition.id}`,
        definition
      );
      dispatch({
        type: exerciseDefinitionTypes.UPDATE_DEFINITION,
        definition: data,
      });
      return data;
    } catch (e) {
      dispatch({ type: baseTypes.ERROR, error: e.message });
      return null;
    }
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
        updatingDefinition: false,
        savingDefinition: false,
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
        definitions: [...action.definitions],
      };
    case exerciseDefinitionTypes.LOADING_DEFINITION:
      return {
        ...state,
        loadingDefinition: true,
      };
    case exerciseDefinitionTypes.GET_DEFINITION_BY_ID:
      const fullDefinition = action.definition;
      const definitionIndex = state.definitions.findIndex(
        (def) => def.id === fullDefinition.id
      );
      if (!state.definitions.length || definitionIndex === -1) {
        return {
          ...state,
          loadingDefinition: false,
          definitions: [fullDefinition],
        };
      }
      const definitions = [...state.definitions];
      definitions[definitionIndex] = fullDefinition as ExerciseDefinition;
      return {
        ...state,
        loadingDefinition: false,
        definitions,
      };
    case exerciseDefinitionTypes.SAVING_DEFINITION:
      return {
        ...state,
        savingDefinition: true,
      };
    case exerciseDefinitionTypes.CREATE_DEFINITION:
      return {
        ...state,
        savingDefinition: false,
        definitions: [...state.definitions, action.definition],
      };
    case exerciseDefinitionTypes.UPDATING_DEFINITION:
      return {
        ...state,
        updatingDefinition: true,
      };
    case exerciseDefinitionTypes.UPDATE_DEFINITION:
      const existingDefintions = [...state.definitions];
      const { title, unit, primaryMuscleGroup } = action.definition;
      existingDefintions.forEach((e, i) => {
        if (e.id === action.definition.id) {
          existingDefintions[i] = {
            ...existingDefintions[i],
            title,
            unit,
            primaryMuscleGroup,
          };
        }
      });
      return {
        ...state,
        updatingDefinition: false,
        definitions: existingDefintions,
      };
    default:
      return state;
  }
};
