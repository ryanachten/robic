import { ExerciseDefinition } from '../constants/Interfaces';
import Axios from 'axios';
import { EXERCISE_DEFINITION_URL } from '../constants/Api';

export enum exerciseDefinitionTypes {
  GET_DEFINITIONS = 'GET_DEFINITIONS',
}

export type ExerciseDefinitionState = {
  definitions: ExerciseDefinition[];
};

export type ExerciseDefinitionAction = {
  type: exerciseDefinitionTypes;
  // definitions: ExerciseDefinitionState;
};

export type ExerciseDefinitionActions = {
  getDefinitions: () => Promise<void>;
};

export const exerciseDefinitionActions = (
  dispatch: React.Dispatch<ExerciseDefinitionAction>
): ExerciseDefinitionActions => ({
  getDefinitions: async () => {
    try {
      const res = await Axios.get(EXERCISE_DEFINITION_URL);
      dispatch({ type: exerciseDefinitionTypes.GET_DEFINITIONS });
      console.log('res', res);
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
      // return { ...action.definitions };
      return state;
    default:
      return state;
  }
};
