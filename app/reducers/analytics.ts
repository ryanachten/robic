import { Analytics } from "../constants/Interfaces";
import axios, { AxiosResponse } from "axios";
import { ANALYTICS_URL } from "../constants/Api";
import { BaseState, BaseActions, baseTypes } from "./base";

export enum analyticsTypes {
  LOADIN_GET_ANALYTICS = "LOADIN_GET_ANALYTICS",
  GET_ANALYTICS = "GET_ANALYTICS",
}

export type AnalyticsAction =
  | BaseActions
  | { type: analyticsTypes.LOADIN_GET_ANALYTICS }
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
      type: analyticsTypes.LOADIN_GET_ANALYTICS,
    });
    try {
      const { data }: AxiosResponse<Analytics> = await axios.get(ANALYTICS_URL);
      dispatch({
        type: analyticsTypes.GET_ANALYTICS,
        analytics: data,
      });
    } catch (e) {
      dispatch({ type: baseTypes.ERROR, error: e.message });
    }
  },
});

export const analyticsReducer = (
  state: AnalyticsState,
  action: AnalyticsAction
): AnalyticsState => {
  switch (action.type) {
    case analyticsTypes.LOADIN_GET_ANALYTICS:
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
