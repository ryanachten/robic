import { all } from "redux-saga/effects";
import { watchExercises } from "./exercise.saga";
import { watchDefinitions } from "./exerciseDefinition.saga";

export function* rootSaga() {
  yield all([watchDefinitions(), watchExercises()]);
}
