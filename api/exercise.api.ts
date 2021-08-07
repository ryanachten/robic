import axios from "axios";
import { EXERCISE_URL } from "../constants/Api";
import { Exercise, ExerciseForCreate } from "../constants/Interfaces";

export const fetchDefinitionExercises = async (): Promise<Array<Exercise>> => {
  try {
    const { data: result } = await axios.get<Array<Exercise>>(EXERCISE_URL);
    return result;
  } catch (error) {
    throw `${error}`;
  }
};

export const createExercise = async (
  exercise: ExerciseForCreate
): Promise<Exercise> => {
  try {
    const { data: result } = await axios.post<Exercise>(EXERCISE_URL, exercise);
    return result;
  } catch (error) {
    throw `${error}`;
  }
};

export const deleteExercise = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${EXERCISE_URL}/${id}`);
  } catch (error) {
    throw `${error}`;
  }
};
