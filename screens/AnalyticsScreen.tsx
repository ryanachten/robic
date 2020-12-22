import React, { useEffect, useReducer } from "react";
import { StyleSheet } from "react-native";
import { Background } from "../components";
import {
  analyticsActions,
  analyticsReducer,
  initialAnalyticsState,
} from "../reducers/analytics";

export default function AnalyticsScreen() {
  const [{ analytics, loading, error }, analyticsDispatch] = useReducer(
    analyticsReducer,
    initialAnalyticsState
  );

  useEffect(() => {
    analyticsActions(analyticsDispatch).getAnalytics();
  }, []);
  console.log("analytics", analytics);

  return <Background></Background>;
}

const styles = StyleSheet.create({});
