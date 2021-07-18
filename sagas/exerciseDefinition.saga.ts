import { call, put, takeLatest } from "redux-saga/effects";
import {
  createDefinition,
  requestDefinitionById,
  requestDefinitions,
  updateDefinition,
} from "../actions/exerciseDefinition.actions";
import * as Api from "../api";
import { ExerciseDefinition } from "../constants/Interfaces";

function* fetchDefinitons() {
  try {
    const plants: Array<ExerciseDefinition> = yield call(Api.fetchDefinitions);
    yield put(requestDefinitions.done({ result: plants }));
  } catch (error) {
    yield put(requestDefinitions.failed(error));
  }
}

function* fetchDefinitionById({
  payload: { id },
}: ReturnType<typeof requestDefinitionById.started>) {
  try {
    const definition: ExerciseDefinition = yield call(
      Api.fetchDefinitionById,
      id
    );
    yield put(
      requestDefinitionById.done({ params: { id }, result: definition })
    );
  } catch (error) {
    yield put(requestDefinitionById.failed(error));
  }
}

function* addDefinition({
  payload: { definition },
}: ReturnType<typeof createDefinition.started>) {
  try {
    const result: ExerciseDefinition = yield call(
      Api.createDefinition,
      definition
    );
    yield put(
      createDefinition.done({
        result,
        params: {
          definition,
        },
      })
    );
  } catch (error) {
    yield put(createDefinition.failed(error));
  }
}

function* editDefinition({
  payload: { definition },
}: ReturnType<typeof updateDefinition.started>) {
  try {
    const result: ExerciseDefinition = yield call(
      Api.updateDefinition,
      definition
    );
    yield put(
      updateDefinition.done({
        result,
        params: {
          definition,
        },
      })
    );
  } catch (error) {
    yield put(updateDefinition.failed(error));
  }
}

export function* watchDefinitions() {
  yield takeLatest(requestDefinitions.started, fetchDefinitons);
  yield takeLatest(requestDefinitionById.started, fetchDefinitionById);
  yield takeLatest(createDefinition.started, addDefinition);
  yield takeLatest(updateDefinition.started, editDefinition);
}
