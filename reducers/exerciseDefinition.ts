import { ExerciseDefinition } from '../constants/Interfaces';
import Axios, { AxiosResponse } from 'axios';
import { EXERCISE_DEFINITION_URL } from '../constants/Api';

export enum exerciseDefinitionTypes {
  GET_DEFINITIONS = 'GET_DEFINITIONS',
  GET_DEFINITION_BY_ID = 'GET_DEFINITION_BY_ID',
}

export type ExerciseDefinitionState = {
  definitions: ExerciseDefinition[];
};

export type ExerciseDefinitionAction = {
  type: exerciseDefinitionTypes;
  payload: ExerciseDefinition[];
};

export type ExerciseDefinitionActions = {
  getDefinitions: () => Promise<void>;
  getDefinitionById: (id: string) => Promise<void>;
};

export const initialExerciseDefinitionState = {
  definitions: [],
};

export const exerciseDefinitionActions = (
  dispatch: React.Dispatch<ExerciseDefinitionAction>
): ExerciseDefinitionActions => ({
  getDefinitions: async () => {
    try {
      const { data } = await Axios.get(EXERCISE_DEFINITION_URL);
      dispatch({
        type: exerciseDefinitionTypes.GET_DEFINITIONS,
        payload: data,
      });
    } catch (e) {
      console.log('error getting definitions', e);
    }
  },
  getDefinitionById: async (id: string) => {
    try {
      const { data }: AxiosResponse<ExerciseDefinition> = await Axios.get(
        `${EXERCISE_DEFINITION_URL}/${id}`
      );
      dispatch({
        type: exerciseDefinitionTypes.GET_DEFINITION_BY_ID,
        payload: [data],
      });
    } catch (e) {
      console.log('error getting definitions', e);
    }
  },
});

export const exerciseDefinitionReducer = (
  state: Partial<ExerciseDefinitionState>,
  action: ExerciseDefinitionAction
) => {
  switch (action.type) {
    case exerciseDefinitionTypes.GET_DEFINITIONS:
      return {
        ...state,
        definitions: [...action.payload],
      };
    case exerciseDefinitionTypes.GET_DEFINITION_BY_ID:
      const fullDefinition = action.payload[0];
      const definitionIndex = state.definitions?.findIndex(
        (def) => def.id === fullDefinition.id
      );
      if (!state.definitions || !definitionIndex || definitionIndex < 0) {
        return {
          ...state,
          definitions: [fullDefinition],
        };
      }
      const definitions = [...state.definitions];
      definitions[definitionIndex] = fullDefinition;
      return {
        ...state,
        definitions,
      };
    default:
      return state;
  }
};
