import { call, put, takeLatest } from "redux-saga/effects";
import { requestAnalytics } from "../actions";
import * as Api from "../api";
import { Analytics } from "../constants/Interfaces";

function* fetchAnalytics() {
  try {
    const analytics: Analytics = yield call(Api.fetchAnalytics);
    yield put(
      requestAnalytics.done({
        result: analytics,
      })
    );
  } catch (error) {
    yield put(requestAnalytics.failed(error));
  }
}

export function* watchAnalytics() {
  yield takeLatest(requestAnalytics.started, fetchAnalytics);
}
