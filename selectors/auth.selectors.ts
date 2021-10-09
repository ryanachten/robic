import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

export const isRestoreTokenLoading = createSelector(
  ({ auth }: RootState) => auth.restoreTokenLoading,
  (state) => state
);

export const isSignUpLoading = createSelector(
  ({ auth }: RootState) => auth.signUpLoading,
  (state) => state
);

export const isSignInLoading = createSelector(
  ({ auth }: RootState) => auth.signInLoading,
  (state) => state
);

export const isSignOutLoading = createSelector(
  ({ auth }: RootState) => auth.signOutLoading,
  (state) => state
);

export const getAuthError = createSelector(
  ({ auth }: RootState) => auth.error,
  (state) => state
);

export const getToken = createSelector(
  ({ auth }: RootState) => auth.token,
  (state) => state
);
