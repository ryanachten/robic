import React, { useEffect, useReducer } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
} from "victory-native";
import { Background, ErrorToast } from "../components";
import { AnalyticsItem } from "../constants/Interfaces";
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

  return (
    <Background>
      {loading && <ActivityIndicator size="large" />}
      <ScrollView>
        {analytics && (
          <>
            <BarChart data={analytics.exerciseFrequency} />
            <BarChart data={analytics.muscleGroupFrequency} />
            <BarChart data={analytics.exerciseProgress} />
          </>
        )}
      </ScrollView>
      <ErrorToast error={error} />
    </Background>
  );
}

type BarChartProps = {
  data: AnalyticsItem[];
};

const BarChart = ({ data }: BarChartProps) => (
  <VictoryChart width={350} theme={VictoryTheme.material}>
    <VictoryBar
      data={data}
      x="marker"
      y="count"
      labels={() => null}
      style={{ labels: { display: "none" } }}
    />
  </VictoryChart>
);

const styles = StyleSheet.create({});
