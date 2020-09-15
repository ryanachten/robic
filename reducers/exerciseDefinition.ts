import { ExerciseDefinition, BaseState } from '../constants/Interfaces';
import Axios, { AxiosResponse } from 'axios';
import { EXERCISE_DEFINITION_URL } from '../constants/Api';

export enum exerciseDefinitionTypes {
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  GET_DEFINITIONS = 'GET_DEFINITIONS',
  GET_DEFINITION_BY_ID = 'GET_DEFINITION_BY_ID',
}

export type ExerciseDefinitionState = BaseState & {
  definitions: ExerciseDefinition[];
};

export type ExerciseDefinitionAction =
  | {
      type: exerciseDefinitionTypes.GET_DEFINITIONS;
      definitions: ExerciseDefinition[];
    }
  | {
      type: exerciseDefinitionTypes.GET_DEFINITION_BY_ID;
      definition: ExerciseDefinition;
    }
  | {
      type: exerciseDefinitionTypes.ERROR;
      error: string;
    }
  | {
      type: exerciseDefinitionTypes.LOADING;
    };

export type ExerciseDefinitionActions = {
  getDefinitions: () => Promise<void>;
  getDefinitionById: (id: string) => Promise<void>;
};

export const initialExerciseDefinitionState: ExerciseDefinitionState = {
  definitions: [],
  loading: true,
  error: null,
};

export const exerciseDefinitionActions = (
  dispatch: React.Dispatch<ExerciseDefinitionAction>
): ExerciseDefinitionActions => ({
  getDefinitions: async () => {
    dispatch({
      type: exerciseDefinitionTypes.LOADING,
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
      console.log('error getting definitions', e);
    }
  },
  getDefinitionById: async (id: string) => {
    dispatch({
      type: exerciseDefinitionTypes.LOADING,
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
      dispatch({ type: exerciseDefinitionTypes.ERROR, error: e.message });
    }
  },
});

export const exerciseDefinitionReducer = (
  state: ExerciseDefinitionState,
  action: ExerciseDefinitionAction
): ExerciseDefinitionState => {
  switch (action.type) {
    case exerciseDefinitionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
    case exerciseDefinitionTypes.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case exerciseDefinitionTypes.GET_DEFINITIONS:
      return {
        ...state,
        loading: false,
        definitions: action.definitions ? [...action.definitions] : [],
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
    default:
      return state;
  }
};
