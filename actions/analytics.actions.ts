import actionCreatorFactory from "typescript-fsa";
import { Analytics } from "../constants/Interfaces";

const actionCreator = actionCreatorFactory();

enum analyticsTypes {
  GET_ANALYTICS = "GET_ANALYTICS",
}

export const requestAnalytics = actionCreator.async<undefined, Analytics>(
  analyticsTypes.GET_ANALYTICS
);
