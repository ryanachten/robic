import { all } from "redux-saga/effects";
import { watchAnalytics } from "./analytics.saga";
import { watchAuth } from "./auth.saga";
import { watchExercises } from "./exercise.saga";
import { watchDefinitions } from "./exerciseDefinition.saga";
import { watchUser } from "./user.saga";

export function* rootSaga() {
  yield all([
    watchAuth(),
    watchDefinitions(),
    watchExercises(),
    watchAnalytics(),
    watchUser(),
  ]);
}
