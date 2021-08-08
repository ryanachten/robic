import { call, put, takeLatest } from "redux-saga/effects";
import {
  createExercise,
  deleteExercise,
  requestDefinitionExercises,
} from "../actions";
import * as Api from "../api";
import { Exercise } from "../constants/Interfaces";

function* fetchDefinitonExercises({
  payload: { definitionId },
}: ReturnType<typeof requestDefinitionExercises.started>) {
  try {
    const exercises: Array<Exercise> = yield call(
      Api.fetchDefinitionExercises,
      definitionId
    );
    yield put(
      requestDefinitionExercises.done({
        result: exercises,
        params: { definitionId },
      })
    );
  } catch (error) {
    yield put(requestDefinitionExercises.failed(error));
  }
}

function* addExcercise({
  payload: { exercise },
}: ReturnType<typeof createExercise.started>) {
  try {
    const result: Exercise = yield call(Api.createExercise, exercise);

    yield put(createExercise.done({ result, params: { exercise } }));
  } catch (error) {
    yield put(createExercise.failed(error));
  }
}

function* removeExcercise({
  payload: { exerciseId },
}: ReturnType<typeof deleteExercise.started>) {
  try {
    yield call(Api.deleteExercise, exerciseId);
    yield put(
      deleteExercise.done({ result: { exerciseId }, params: { exerciseId } })
    );
  } catch (error) {
    yield put(createExercise.failed(error));
  }
}

export function* watchExercises() {
  yield takeLatest(requestDefinitionExercises.started, fetchDefinitonExercises);
  yield takeLatest(createExercise.started, addExcercise);
  yield takeLatest(deleteExercise.started, removeExcercise);
}
