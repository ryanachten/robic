import AsyncStorage from "@react-native-community/async-storage";
import { call, put, takeLatest } from "redux-saga/effects";
import { requestRestoreUser } from "../actions";
import { User } from "../constants/Interfaces";
import { StorageKeys } from "../constants/StorageKeys";

function* restoreUser() {
  try {
    const userState: string | null = yield call(
      AsyncStorage.getItem,
      StorageKeys.User
    );
    if (userState) {
      const user: User = JSON.parse(userState);
      yield put(
        requestRestoreUser.done({
          result: user,
        })
      );
    }
  } catch (error) {
    yield put(requestRestoreUser.failed(error));
  }
}

export function* watchUser() {
  yield takeLatest(requestRestoreUser.started, restoreUser);
}
