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
  GET_EXERCISES_BY_DEFINITION = "GET_EXERCISES_BY_DEFINITION",
  LOADING_EXERCISES = "LOADING_EXERCISES",
  CREATE_EXERCISE = "CREATE_EXERCISE",
  SAVING_EXERCISE = "SAVING_EXERCISE",
  DELETE_EXERCISE = "DELETE_EXERCISE",
  DELETING_EXERCISE = "DELETING_EXERCISE",
}

export type ExerciseState = BaseState & {
  loadingExercises: boolean;
  savingExercise: boolean;
  deletingExercise: boolean;
  exercises: Exercise[];
};

export type ExerciseAction =
  | BaseActions
  | { type: exerciseTypes.LOADING_EXERCISES }
  | {
      type: exerciseTypes.GET_EXERCISES_BY_DEFINITION;
      exercises: Exercise[];
    }
  | {
      type: exerciseTypes.CREATE_EXERCISE;
      exercise: Exercise;
    }
  | { type: exerciseTypes.SAVING_EXERCISE }
  | {
      type: exerciseTypes.DELETE_EXERCISE;
      id: string;
    }
  | { type: exerciseTypes.DELETING_EXERCISE };

export type ExerciseActions = {
  getExercisesByDefinition: (definitionId: string) => Promise<void>;
  createExercise: (exercise: ExerciseForPost) => Promise<void>;
  deleteExercise: (id: string) => Promise<void>;
};

export const initialExerciseState: ExerciseState = {
  loading: false,
  exercises: [],
  loadingExercises: false,
  savingExercise: false,
  deletingExercise: false,
  error: null,
};

export const exerciseActions = (
  dispatch: React.Dispatch<ExerciseAction>
): ExerciseActions => ({
  getExercisesByDefinition: async (definitionId: string) => {
    dispatch({
      type: exerciseTypes.LOADING_EXERCISES,
    });
    try {
      const { data }: AxiosResponse<Exercise[]> = await axios.get(
        EXERCISE_URL,
        {
          params: {
            definition: definitionId,
          },
        }
      );
      dispatch({
        type: exerciseTypes.GET_EXERCISES_BY_DEFINITION,
        exercises: data,
      });
    } catch (e) {
      dispatch({ type: baseTypes.ERROR, error: e.message });
    }
  },
  createExercise: async (exercise: ExerciseForPost) => {
    dispatch({
      type: exerciseTypes.SAVING_EXERCISE,
    });
    try {
      const { data }: AxiosResponse<Exercise> = await axios.post(
        EXERCISE_URL,
        exercise
      );
      dispatch({
        type: exerciseTypes.CREATE_EXERCISE,
        exercise: data,
      });
    } catch (e) {
      dispatch({ type: baseTypes.ERROR, error: e.message });
    }
  },
  deleteExercise: async (id: string) => {
    dispatch({
      type: exerciseTypes.DELETING_EXERCISE,
    });
    try {
      await axios.delete(`${EXERCISE_URL}/${id}`);
      dispatch({
        type: exerciseTypes.DELETE_EXERCISE,
        id,
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
    case baseTypes.ERROR:
      return {
        ...state,
        savingExercise: false,
        loadingExercises: false,
        deletingExercise: false,
        error: action.error,
      };
    case exerciseTypes.GET_EXERCISES_BY_DEFINITION:
      const newExercises = [...action.exercises];
      const newExerciseIds = newExercises.map((e) => e.id);
      const existingExercises = [...state.exercises].filter(
        (e) => !newExerciseIds.includes(e.id)
      );
      return {
        ...state,
        loadingExercises: false,
        exercises: [...existingExercises, ...newExercises],
      };
    case exerciseTypes.CREATE_EXERCISE: {
      const { exercises } = state;
      const index = exercises.findIndex(({ id }) => action.exercise.id === id);
      exercises[index] = action.exercise;
      return {
        ...state,
        savingExercise: false,
        exercises: [...exercises],
      };
    }
    case exerciseTypes.DELETE_EXERCISE: {
      const { exercises } = state;
      const updatedExercises = [...exercises].filter((e) => e.id !== action.id);
      return {
        ...state,
        deletingExercise: false,
        exercises: [...updatedExercises],
      };
    }
    default:
      return state;
  }
};
