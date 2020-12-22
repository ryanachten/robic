import React, { useEffect, useReducer } from "react";
import {
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Background, BarChart, ErrorToast, PieChart } from "../components";
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

  return (
    <Background>
      {loading && <ActivityIndicator size="large" />}
      <ScrollView>
        {analytics && (
          <>
            <AnalyticsChart
              title="Muscle group frequency"
              data={analytics.muscleGroupFrequency}
              variant="pie"
            />
            <AnalyticsChart
              title="Exercises frequency"
              data={analytics.exerciseFrequency}
            />
            <AnalyticsChart
              title="Exercise progress"
              data={analytics.exerciseProgress}
            />
          </>
        )}
      </ScrollView>
      <ErrorToast error={error} />
    </Background>
  );
}

type BarChartProps = {
  data: AnalyticsItem[];
  variant?: "pie" | "bar";
  title: string;
};

const AnalyticsChart = ({ data, title, variant }: BarChartProps) => {
  // TODO: this shouldn't be necessary - used to avoid horizontal overflow
  const windowWidth = useWindowDimensions().width;
  const commonProps = {
    title: title,
  };

  if (variant === "pie") {
    return (
      <PieChart
        {...commonProps}
        pieProps={{
          data,
          x: "marker",
          y: "count",
        }}
        chartProps={{ width: windowWidth - 100 }}
      />
    );
  }
  return (
    <BarChart
      {...commonProps}
      barProps={{
        data,
        x: "marker",
        y: "count",
      }}
      chartProps={{ width: windowWidth - 40 }}
    />
  );
};
