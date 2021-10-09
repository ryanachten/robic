import { Token } from "../constants/Interfaces";
import { BaseState } from "./base.reducer";
import { createReducer } from "@reduxjs/toolkit";
import { requestRestoreToken, requestSignOut } from "../actions";

export type AuthState = BaseState & {
  token: Token;
  signUpLoading: boolean;
  signInLoading: boolean;
  signOutLoading: boolean;
  restoreTokenLoading: boolean;
};

export const initialAuthState: AuthState = {
  signUpLoading: false,
  signInLoading: false,
  signOutLoading: false,
  restoreTokenLoading: false,
  token: null,
  error: null,
};

export const authReducer = createReducer(initialAuthState, (builder) => {
  // Restore token
  builder.addCase(requestRestoreToken.started, (state) => {
    state.restoreTokenLoading = true;
  });
  builder.addCase(requestRestoreToken.done, (state, { payload }) => {
    state.token = payload.result;
    state.restoreTokenLoading = false;
    state.error = null;
  });
  builder.addCase(requestRestoreToken.failed, (state, { payload }) => {
    state.restoreTokenLoading = false;
    state.error = `${payload}`;
  });
  // Sign out
  builder.addCase(requestSignOut.started, (state) => {
    state.signOutLoading = true;
  });
  builder.addCase(requestSignOut.done, (state) => {
    state.signOutLoading = false;
    state.token = null;
    state.error = null;
  });
  builder.addCase(requestSignOut.failed, (state, { payload }) => {
    state.signOutLoading = false;
    state.error = `${payload}`;
  });
});
