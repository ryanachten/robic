import { all } from "redux-saga/effects";
import { watchDefinitions } from "./exerciseDefinition.saga";

export function* rootSaga() {
  yield all([watchDefinitions()]);
}
