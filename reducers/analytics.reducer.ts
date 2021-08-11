import { Analytics } from "../constants/Interfaces";
import { BaseState } from "./base.reducer";
import { createReducer } from "@reduxjs/toolkit";
import { requestAnalytics } from "../actions";

export type AnalyticsState = BaseState & {
  analytics: Analytics | null;
  loading: boolean;
};

export const initialAnalyticsState: AnalyticsState = {
  analytics: null,
  loading: false,
  error: null,
};

export const analyticsReducer = createReducer(
  initialAnalyticsState,
  (builder) => {
    // Request analytics
    builder.addCase(requestAnalytics.started, (state) => {
      state.loading = true;
    });
    builder.addCase(requestAnalytics.done, (state, { payload }) => {
      state.analytics = payload.result;
      state.loading = false;
    });
    builder.addCase(requestAnalytics.failed, (state, { payload }) => {
      state.loading = false;
      state.error = `${payload}`;
    });
  }
);
