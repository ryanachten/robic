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
  CREATE_EXERCISE = "CREATE_EXERCISE",
  DELETE_EXERCISE = "DELETE_EXERCISE",
}

export type ExerciseState = BaseState & {
  exercises: Exercise[];
};

export type ExerciseAction =
  | BaseActions
  | {
      type: exerciseTypes.GET_EXERCISES_BY_DEFINITION;
      exercises: Exercise[];
    }
  | {
      type: exerciseTypes.CREATE_EXERCISE;
      exercise: Exercise;
    }
  | {
      type: exerciseTypes.DELETE_EXERCISE;
      id: string;
    };

export type ExerciseActions = {
  getExercisesByDefintion: (definitionId: string) => Promise<void>;
  createExercise: (exercise: ExerciseForPost) => Promise<void>;
  deleteExercise: (id: string) => Promise<void>;
};

export const initialExerciseState: ExerciseState = {
  exercises: [],
  loading: false,
  error: null,
};

export const exerciseActions = (
  dispatch: React.Dispatch<ExerciseAction>
): ExerciseActions => ({
  getExercisesByDefintion: async (definitionId: string) => {
    dispatch({
      type: baseTypes.LOADING,
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
      type: baseTypes.LOADING,
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
      type: baseTypes.LOADING,
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
    case exerciseTypes.GET_EXERCISES_BY_DEFINITION:
      const newExercises = [...action.exercises];
      const newExerciseIds = newExercises.map((e) => e.id);
      const existingExercises = [...state.exercises].filter(
        (e) => !newExerciseIds.includes(e.id)
      );
      return {
        ...state,
        loading: false,
        exercises: [...existingExercises, ...newExercises],
      };
    case exerciseTypes.CREATE_EXERCISE: {
      const { exercises } = state;
      const index = exercises.findIndex(({ id }) => action.exercise.id === id);
      exercises[index] = action.exercise;
      return {
        ...state,
        loading: false,
        exercises: [...exercises],
      };
    }
    case exerciseTypes.DELETE_EXERCISE: {
      const { exercises } = state;
      const updatedExercises = [...exercises].filter((e) => e.id !== action.id);
      return {
        ...state,
        loading: false,
        exercises: [...updatedExercises],
      };
    }
    default:
      return state;
  }
};
