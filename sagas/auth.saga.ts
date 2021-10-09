import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  requestRestoreToken,
  requestSignIn,
  requestSignOut,
  requestSignUp,
} from "../actions";
import * as Api from "../api";
import { Token } from "../constants/Interfaces";
import { StorageKeys } from "../constants/StorageKeys";

const setAuthorizationHeaders = async (token: string) =>
  (axios.defaults.headers.common["Authorization"] = `bearer ${token}`);

function* restoreToken() {
  try {
    const token: Token = yield call(AsyncStorage.getItem, StorageKeys.Token);
    if (token) {
      setAuthorizationHeaders(token);
    }
    yield put(requestRestoreToken.done({ result: token }));
  } catch (error) {
    yield put(requestRestoreToken.failed(error));
  }
}

function* signIn({ payload: user }: ReturnType<typeof requestSignIn.started>) {
  try {
    console.log("signIn");

    const { token, userDetails } = yield Api.loginUser(user);

    // Dispatch and serialise token
    yield AsyncStorage.setItem(StorageKeys.Token, token);
    setAuthorizationHeaders(token);

    // Dispatch and serialise user
    yield AsyncStorage.setItem(StorageKeys.User, JSON.stringify(userDetails));

    yield put(requestSignIn.done({ params: user, result: userDetails }));
  } catch (error) {
    yield put(requestSignIn.failed(error));
  }
}

function* signOut() {
  try {
    AsyncStorage.multiRemove([StorageKeys.Token, StorageKeys.User]);
    yield put(requestSignOut.done({}));
  } catch (error) {
    yield put(requestSignOut.failed(error));
  }
}

function* signUp({ payload: user }: ReturnType<typeof requestSignUp.started>) {
  try {
    yield Api.createUser(user);
    yield put(
      requestSignUp.done({
        params: user,
      })
    );
  } catch (error) {
    yield put(requestSignUp.failed(error));
  }
}

export function* watchAuth() {
  yield takeLatest(requestRestoreToken.started, restoreToken);
  yield takeLatest(requestSignOut.started, signOut);
  yield takeLatest(requestSignUp.started, signUp);
  yield takeLatest(requestSignIn.started, signIn);
}
