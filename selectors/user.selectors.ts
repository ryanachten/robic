import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

export const isUserLoading = createSelector(
  ({ user }: RootState) => user.loading,
  (state) => state
);

export const getUserError = createSelector(
  ({ user }: RootState) => user.error,
  (state) => state
);

export const getUser = createSelector(
  ({ user }: RootState) => user.user,
  (state) => state
);
