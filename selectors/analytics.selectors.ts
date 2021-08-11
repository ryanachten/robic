import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

export const isAnalyticsLoading = createSelector(
  ({ analytics }: RootState) => analytics.loading,
  (state) => state
);

export const getAnalyticsError = createSelector(
  ({ analytics }: RootState) => analytics.error,
  (state) => state
);

export const getAnalytics = createSelector(
  ({ analytics: { analytics } }: RootState) =>
    analytics
      ? {
          ...analytics,
          exerciseFrequency: [...analytics.exerciseFrequency],
          exerciseProgress: [...analytics.exerciseProgress],
          muscleGroupFrequency: [...analytics.exerciseFrequency],
        }
      : null,
  (state) => state
);
