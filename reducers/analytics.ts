import { Analytics } from "../constants/Interfaces";
import axios, { AxiosResponse } from "axios";
import { ANALYTICS_URL } from "../constants/Api";
import { BaseState, BaseActions, baseTypes } from "./base";

export enum analyticsTypes {
  GET_ANALYTICS = "GET_ANALYTICS",
}

export type AnalyticsState = BaseState & {
  analytics: Analytics | null;
};

export type AnalyticsAction =
  | BaseActions
  | {
      type: analyticsTypes.GET_ANALYTICS;
      analytics: Analytics;
    };

export type AnalyticsActions = {
  getAnalytics: () => Promise<void>;
};

export const initialAnalyticsState: AnalyticsState = {
  analytics: null,
  loading: false,
  error: null,
};

export const analyticsActions = (
  dispatch: React.Dispatch<AnalyticsAction>
): AnalyticsActions => ({
  getAnalytics: async () => {
    dispatch({
      type: baseTypes.LOADING,
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
    case baseTypes.LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case baseTypes.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case analyticsTypes.GET_ANALYTICS:
      return {
        ...state,
        loading: false,
        analytics: action.analytics,
      };
    default:
      return state;
  }
};
