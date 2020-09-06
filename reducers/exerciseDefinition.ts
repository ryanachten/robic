import { ExerciseDefinition } from '../constants/Interfaces';
import Axios from 'axios';
import { EXERCISE_DEFINITION_URL } from '../constants/Api';

export enum exerciseDefinitionTypes {
  GET_DEFINITIONS = 'GET_DEFINITIONS',
}

export type ExerciseDefinitionState = {
  definitions: ExerciseDefinition[];
};

export type ExerciseDefinitionAction = ExerciseDefinitionState & {
  type: exerciseDefinitionTypes;
};

export type ExerciseDefinitionActions = {
  getDefinitions: () => Promise<void>;
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
        definitions: data,
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
        definitions: [...action.definitions],
      };
    default:
      return state;
  }
};
