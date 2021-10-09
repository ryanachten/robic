import { User } from "../constants/Interfaces";
import { BaseState } from "./base.reducer";
import { createReducer } from "@reduxjs/toolkit";
import { requestRestoreUser } from "../actions";

export type UserState = BaseState & {
  user: User;
  loading: boolean;
};

export const initialUserState: UserState = {
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    exercises: [],
  },
  loading: false,
  error: null,
};

export const userReducer = createReducer(initialUserState, (builder) => {
  // Request user
  builder.addCase(requestRestoreUser.started, (state) => {
    state.loading = true;
  });
  builder.addCase(requestRestoreUser.done, (state, { payload }) => {
    state.user = payload.result;
    state.loading = false;
  });
  builder.addCase(requestRestoreUser.failed, (state, { payload }) => {
    state.loading = false;
    state.error = `${payload}`;
  });
  // Login user
});
