import { apiClient, Analytics } from "../api";
import { BaseState, BaseActions, baseTypes } from "./base";
import { getErrorDetail } from "../utilities";

export enum analyticsTypes {
  LOADING_GET_ANALYTICS = "LOADING_GET_ANALYTICS",
  GET_ANALYTICS = "GET_ANALYTICS",
}

export type AnalyticsAction =
  | BaseActions
  | { type: analyticsTypes.LOADING_GET_ANALYTICS }
  | {
      type: analyticsTypes.GET_ANALYTICS;
      analytics: Analytics;
    };

export type AnalyticsActions = {
  getAnalytics: () => Promise<void>;
};

export type AnalyticsState = BaseState & {
  loadingAnalytics: boolean;
  analytics: Analytics | null;
};

export const initialAnalyticsState: AnalyticsState = {
  analytics: null,
  loadingAnalytics: false,
  error: null,
};

export const analyticsActions = (
  dispatch: React.Dispatch<AnalyticsAction>
): AnalyticsActions => ({
  getAnalytics: async () => {
    dispatch({
      type: analyticsTypes.LOADING_GET_ANALYTICS,
    });

    const { data, error } = await apiClient.GET("/api/Analytics");

    if (error) {
      const errorDetail = getErrorDetail(error);
      dispatch({ type: baseTypes.ERROR, error: errorDetail });
      return;
    }

    dispatch({
      type: analyticsTypes.GET_ANALYTICS,
      analytics: data,
    });
  },
});

export const analyticsReducer = (
  state: AnalyticsState,
  action: AnalyticsAction
): AnalyticsState => {
  switch (action.type) {
    case analyticsTypes.LOADING_GET_ANALYTICS:
      return {
        ...state,
        loadingAnalytics: true,
      };
    case analyticsTypes.GET_ANALYTICS:
      return {
        ...state,
        loadingAnalytics: false,
        analytics: action.analytics,
      };
    case baseTypes.ERROR:
      return {
        ...state,
        loadingAnalytics: false,
        error: action.error,
      };
    default:
      return state;
  }
};
