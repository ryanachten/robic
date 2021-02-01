import { Exercise, Set } from "../constants/Interfaces";
import axios, { AxiosResponse } from "axios";
import { EXERCISE_URL } from "../constants/Api";
import { BaseState, BaseActions, baseTypes } from "./base";

export type ExerciseForPost = {
  definition: string;
  sets: Set[];
  timeTaken?: string;
};

export enum exerciseTypes {
  GET_EXERCISES = "GET_EXERCISES",
  POST_EXERCISE = "POST_EXERCISE",
}

export type ExerciseState = BaseState & {
  exercises: Exercise[];
};

export type ExerciseAction =
  | BaseActions
  | {
      type: exerciseTypes.GET_EXERCISES;
      exercises: Exercise[];
    }
  | {
      type: exerciseTypes.POST_EXERCISE;
      exercise: Exercise;
    };

export type ExerciseActions = {
  getExercises: () => Promise<void>;
  postExercise: (exercise: ExerciseForPost) => Promise<void>;
};

export const initialExerciseState: ExerciseState = {
  exercises: [],
  loading: false,
  error: null,
};

export const exerciseActions = (
  dispatch: React.Dispatch<ExerciseAction>
): ExerciseActions => ({
  getExercises: async () => {
    dispatch({
      type: baseTypes.LOADING,
    });
    try {
      const { data }: AxiosResponse<Exercise[]> = await axios.get(EXERCISE_URL);
      dispatch({
        type: exerciseTypes.GET_EXERCISES,
        exercises: data,
      });
    } catch (e) {
      dispatch({ type: baseTypes.ERROR, error: e.message });
    }
  },
  postExercise: async (exercise: ExerciseForPost) => {
    dispatch({
      type: baseTypes.LOADING,
    });
    try {
      const { data }: AxiosResponse<Exercise> = await axios.post(
        EXERCISE_URL,
        exercise
      );
      dispatch({
        type: exerciseTypes.POST_EXERCISE,
        exercise: data,
      });
    } catch (e) {
      dispatch({ type: baseTypes.ERROR, error: e.message });
    }
  },
});

export const exerciseReducer = (
  state: ExerciseState,
  action: ExerciseAction
): ExerciseState => {
  switch (action.type) {
    case baseTypes.LOADING:
      return {
        ...state,
        error: null,
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
    case exerciseTypes.POST_EXERCISE:
      const { exercises } = state;
      const index = exercises.findIndex(({ id }) => action.exercise.id === id);
      exercises[index] = action.exercise;
      return {
        ...state,
        loading: false,
        exercises: [...exercises],
      };
    default:
      return state;
  }
};
