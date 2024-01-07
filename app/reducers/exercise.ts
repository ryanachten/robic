import { Exercise, UpdateExercise } from "../constants/Interfaces";
import { BaseState, BaseActions, baseTypes } from "./base";
import client from "../api/client";
import { getErrorDetail } from "../utilities";

export enum exerciseTypes {
  LOADING_EXERCISES = "LOADING_EXERCISES",
  GET_EXERCISES_BY_DEFINITION = "GET_EXERCISES_BY_DEFINITION",
  LOADING_CREATE_EXERCISE = "LOADING_CREATE_EXERCISE",
  CREATE_EXERCISE = "CREATE_EXERCISE",
  LOADING_DELETE_EXERCISE = "LOADING_DELETE_EXERCISE",
  DELETE_EXERCISE = "DELETE_EXERCISE",
}

export type ExerciseState = BaseState & {
  loadingExercises: boolean;
  loadingCreateExercise: boolean;
  loadingDeleteExercise: boolean;
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
  | { type: exerciseTypes.LOADING_CREATE_EXERCISE }
  | {
      type: exerciseTypes.DELETE_EXERCISE;
      id: number;
    }
  | { type: exerciseTypes.LOADING_DELETE_EXERCISE };

export type ExerciseActions = {
  getExercisesByDefinition: (definitionId: number) => Promise<void>;
  createExercise: (exercise: UpdateExercise) => Promise<void>;
  deleteExercise: (id: number) => Promise<void>;
};

export const initialExerciseState: ExerciseState = {
  exercises: [],
  loadingExercises: true,
  loadingCreateExercise: false,
  loadingDeleteExercise: false,
  error: null,
};

export const exerciseActions = (
  dispatch: React.Dispatch<ExerciseAction>
): ExerciseActions => ({
  getExercisesByDefinition: async (definition: number) => {
    dispatch({
      type: exerciseTypes.LOADING_EXERCISES,
    });

    const { data, error } = await client.GET("/api/Exercise", {
      params: {
        query: {
          definition,
        },
      },
    });

    if (error) {
      const errorDetail = getErrorDetail(error);
      dispatch({ type: baseTypes.ERROR, error: errorDetail });
      return;
    }

    dispatch({
      type: exerciseTypes.GET_EXERCISES_BY_DEFINITION,
      exercises: data,
    });
  },
  createExercise: async (exercise: UpdateExercise) => {
    dispatch({
      type: exerciseTypes.LOADING_CREATE_EXERCISE,
    });

    const { data, error } = await client.POST("/api/Exercise", {
      body: exercise,
    });

    if (error) {
      const errorDetail = getErrorDetail(error);
      dispatch({ type: baseTypes.ERROR, error: errorDetail });
      return;
    }

    dispatch({
      type: exerciseTypes.CREATE_EXERCISE,
      exercise: data,
    });
  },
  deleteExercise: async (id: number) => {
    dispatch({
      type: exerciseTypes.LOADING_DELETE_EXERCISE,
    });

    const { error } = await client.DELETE("/api/Exercise/{id}", {
      params: {
        path: {
          id,
        },
      },
    });

    if (error) {
      const errorDetail = getErrorDetail(error);
      dispatch({ type: baseTypes.ERROR, error: errorDetail });
      return;
    }

    dispatch({
      type: exerciseTypes.DELETE_EXERCISE,
      id,
    });
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
        loadingCreateExercise: false,
        loadingExercises: false,
        loadingDeleteExercise: false,
        error: action.error,
      };
    case exerciseTypes.LOADING_EXERCISES: {
      return {
        ...state,
        loadingExercises: true,
      };
    }
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
    case exerciseTypes.LOADING_CREATE_EXERCISE: {
      return {
        ...state,
        loadingCreateExercise: true,
      };
    }
    case exerciseTypes.CREATE_EXERCISE: {
      const { exercises } = state;
      const index = exercises.findIndex(({ id }) => action.exercise.id === id);
      exercises[index] = action.exercise;
      return {
        ...state,
        loadingCreateExercise: false,
        exercises: [...exercises],
      };
    }
    case exerciseTypes.DELETE_EXERCISE: {
      return {
        ...state,
        loadingDeleteExercise: true,
      };
    }
    case exerciseTypes.DELETE_EXERCISE: {
      const { exercises } = state;
      const updatedExercises = [...exercises].filter((e) => e.id !== action.id);
      return {
        ...state,
        loadingDeleteExercise: false,
        exercises: [...updatedExercises],
      };
    }
    default:
      return state;
  }
};
