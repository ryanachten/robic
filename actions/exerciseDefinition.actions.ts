import actionCreatorFactory from "typescript-fsa";
import {
  ExerciseDefinition,
  ExerciseDefinitionForCreate,
  ExerciseDefinitionForEdit,
} from "../constants/Interfaces";

const actionCreator = actionCreatorFactory();

enum exerciseDefinitionTypes {
  GET_DEFINITIONS = "GET_DEFINITIONS",
  GET_DEFINITION_BY_ID = "GET_DEFINITION_BY_ID",
  CREATE_DEFINITION = "CREATE_DEFINITION",
  UPDATE_DEFINITION = "UPDATE_DEFINITION",
}

export const requestDefinitions = actionCreator.async<
  undefined,
  Array<ExerciseDefinition>
>(exerciseDefinitionTypes.GET_DEFINITIONS);

export const requestDefinitionById = actionCreator.async<
  { id: string },
  ExerciseDefinition
>(exerciseDefinitionTypes.GET_DEFINITION_BY_ID);

export const createDefinition = actionCreator.async<
  { definition: ExerciseDefinitionForCreate },
  ExerciseDefinition
>(exerciseDefinitionTypes.CREATE_DEFINITION);

export const updateDefinition = actionCreator.async<
  { definition: ExerciseDefinitionForEdit },
  ExerciseDefinition
>(exerciseDefinitionTypes.UPDATE_DEFINITION);
