import actionCreatorFactory from "typescript-fsa";
import { Exercise, ExerciseForCreate } from "../constants/Interfaces";

const actionCreator = actionCreatorFactory();

enum exerciseTypes {
  GET_EXERCISES_BY_DEFINITION = "GET_EXERCISES_BY_DEFINITION",
  CREATE_EXERCISE = "CREATE_EXERCISE",
  DELETE_EXERCISE = "DELETE_EXERCISE",
}

export const requestDefinitionExercises = actionCreator.async<
  undefined,
  Array<Exercise>
>(exerciseTypes.GET_EXERCISES_BY_DEFINITION);

export const createExercise = actionCreator.async<
  { exercise: ExerciseForCreate },
  Exercise
>(exerciseTypes.CREATE_EXERCISE);

export const deleteExercise = actionCreator.async<
  { exerciseId: string },
  { exerciseId: string }
>(exerciseTypes.DELETE_EXERCISE);
