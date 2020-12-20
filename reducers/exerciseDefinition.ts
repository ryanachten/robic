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
  GET_DEFINITION_BY_ID = "GET_DEFINITION_BY_ID",
  CREATE_DEFINITION = "CREATE_DEFINITION",
  UPDATE_DEFINITION = "UPDATE_DEFINITION",
}

export type ExerciseDefinitionState = BaseState & {
  definitions: ExerciseDefinition[];
};

export type ExerciseDefinitionAction =
  | BaseActions
  | {
      type: exerciseDefinitionTypes.GET_DEFINITIONS;
      definitions: ExerciseDefinition[];
    }
  | {
      type: exerciseDefinitionTypes.GET_DEFINITION_BY_ID;
      definition: ExerciseDefinition;
    }
  | {
      type: exerciseDefinitionTypes.CREATE_DEFINITION;
      definition: ExerciseDefinition;
    }
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
  loading: false,
  error: null,
};

export const exerciseDefinitionActions = (
  dispatch: React.Dispatch<ExerciseDefinitionAction>
): ExerciseDefinitionActions => ({
  getDefinitions: async () => {
    dispatch({
      type: baseTypes.LOADING,
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
      type: baseTypes.LOADING,
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
      type: baseTypes.LOADING,
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
      type: baseTypes.LOADING,
    });
    try {
      const { data }: AxiosResponse<ExerciseDefinition> = await Axios.put(
        `${EXERCISE_DEFINITION_URL}/${definition.id}`,
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
});

export const exerciseDefinitionReducer = (
  state: ExerciseDefinitionState,
  action: ExerciseDefinitionAction
): ExerciseDefinitionState => {
  switch (action.type) {
    case baseTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
    case baseTypes.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case exerciseDefinitionTypes.GET_DEFINITIONS:
      return {
        ...state,
        loading: false,
        definitions: [...action.definitions],
      };
    case exerciseDefinitionTypes.GET_DEFINITION_BY_ID:
      const fullDefinition = action.definition;
      const definitionIndex = state.definitions?.findIndex(
        (def) => def.id === fullDefinition.id
      );
      if (!state.definitions || definitionIndex < 0) {
        return {
          ...state,
          loading: false,
          definitions: [fullDefinition],
        };
      }
      const definitions = [...state.definitions];
      definitions[definitionIndex] = fullDefinition as ExerciseDefinition;
      return {
        ...state,
        loading: false,
        definitions,
      };
    case exerciseDefinitionTypes.CREATE_DEFINITION:
      return {
        ...state,
        loading: false,
        definitions: [...state.definitions, action.definition],
      };
    case exerciseDefinitionTypes.UPDATE_DEFINITION:
      const existingDefintions = state.definitions.filter(
        (d) => d.id === action.definition.id
      );
      return {
        ...state,
        loading: false,
        definitions: [...existingDefintions, action.definition],
      };
    default:
      return state;
  }
};
