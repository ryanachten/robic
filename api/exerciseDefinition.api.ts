import axios from "axios";
import { EXERCISE_DEFINITION_URL } from "../constants/Api";
import {
  ExerciseDefinition,
  ExerciseDefinitionForCreate,
  ExerciseDefinitionForEdit,
} from "../constants/Interfaces";

export const fetchDefinitions = async (): Promise<
  Array<ExerciseDefinition>
> => {
  try {
    const { data: result } = await axios.get<Array<ExerciseDefinition>>(
      EXERCISE_DEFINITION_URL
    );
    return result;
  } catch (error) {
    throw `${error}`;
  }
};

export const fetchDefinitionById = async (
  id: string
): Promise<ExerciseDefinition> => {
  try {
    const { data: result } = await axios.get<ExerciseDefinition>(
      `${EXERCISE_DEFINITION_URL}/${id}`
    );
    return result;
  } catch (error) {
    throw `${error}`;
  }
};

export const createDefinition = async (
  definition: ExerciseDefinitionForCreate
): Promise<ExerciseDefinition> => {
  try {
    const { data: result } = await axios.post<ExerciseDefinition>(
      EXERCISE_DEFINITION_URL,
      definition
    );
    return result;
  } catch (error) {
    throw `${error}`;
  }
};

export const updateDefinition = async (
  definition: ExerciseDefinitionForEdit
): Promise<ExerciseDefinition> => {
  try {
    const { data: result } = await axios.post<ExerciseDefinition>(
      `${EXERCISE_DEFINITION_URL}/${definition.id}`,
      definition
    );
    return result;
  } catch (error) {
    throw `${error}`;
  }
};
