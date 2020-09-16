import { Exercise } from '../constants/Interfaces';
import Axios, { AxiosResponse } from 'axios';
import { EXERCISE_DEFINITION_URL } from '../constants/Api';
import { BaseState, BaseActions, baseTypes } from './base';

export enum exerciseTypes {
  GET_EXERCISES = 'GET_EXERCISES',
}

export type ExerciseState = BaseState & {
  exercises: Exercise[];
};

export type ExerciseAction =
  | BaseActions
  | {
      type: exerciseTypes.GET_EXERCISES;
      exercises: Exercise[];
    };

export type ExerciseActions = {
  getExercises: () => Promise<void>;
};

export const initialExerciseState: ExerciseState = {
  exercises: [],
  loading: true,
  error: null,
};

export const exerciseDefinitionActions = (
  dispatch: React.Dispatch<ExerciseAction>
): ExerciseActions => ({
  getExercises: async () => {
    dispatch({
      type: baseTypes.LOADING,
    });
    try {
      const { data }: AxiosResponse<Exercise[]> = await Axios.get(
        EXERCISE_DEFINITION_URL
      );
      dispatch({
        type: exerciseTypes.GET_EXERCISES,
        exercises: data,
      });
    } catch (e) {
      dispatch({ type: baseTypes.ERROR, error: e.message });
    }
  },
});

export const exerciseDefinitionReducer = (
  state: ExerciseState,
  action: ExerciseAction
): ExerciseState => {
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
    case exerciseTypes.GET_EXERCISES:
      return {
        ...state,
        loading: false,
        exercises: [...action.exercises],
      };
    default:
      return state;
  }
};
