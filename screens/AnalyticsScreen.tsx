import { Text } from "@ui-kitten/components";
import React, { useEffect, useReducer } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { Background, BarChart, ErrorToast, PieChart } from "../components";
import { AnalyticsItem } from "../constants/Interfaces";
import { Margin } from "../constants/Sizes";
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

  const resultsPerChart = 20;

  return (
    <Background>
      {loading && <ActivityIndicator size="large" />}
      <ScrollView>
        {analytics && (
          <>
            <View style={styles.overviewWrapper}>
              {analytics.mostFrequentMuscleGroup && (
                <AnalyticsOverview
                  label="Top Muscle Group"
                  item={analytics.mostFrequentMuscleGroup}
                  style={styles.overviewLeftGutter}
                />
              )}
              {analytics.mostFrequentExercise && (
                <AnalyticsOverview
                  label="Top Exercise"
                  item={analytics.mostFrequentExercise}
                />
              )}
            </View>
            <AnalyticsChart
              title="Muscle group frequency"
              data={analytics.muscleGroupFrequency}
              variant="pie"
            />
            <AnalyticsChart
              title="Most frequent exercises"
              data={analytics.exerciseFrequency.splice(0, resultsPerChart)}
            />
            <AnalyticsChart
              title="Least frequent exercises"
              data={analytics.exerciseFrequency.splice(
                analytics.exerciseFrequency.length - resultsPerChart,
                analytics.exerciseFrequency.length
              )}
            />
            <AnalyticsChart
              title="Most exercise progress"
              data={analytics.exerciseProgress.splice(0, resultsPerChart)}
            />
            <AnalyticsChart
              title="Least exercise progress"
              data={analytics.exerciseProgress.splice(
                analytics.exerciseProgress.length - resultsPerChart,
                analytics.exerciseProgress.length
              )}
            />
          </>
        )}
      </ScrollView>
      <ErrorToast error={error} />
    </Background>
  );
}

const AnalyticsOverview = ({
  label,
  item,
  style,
}: {
  label: string;
  item: AnalyticsItem;
  style?: ViewStyle;
}) => (
  <View style={style}>
    <Text category="label">{label}</Text>
    <Text>{`${item.marker} (x${item.count})`}</Text>
  </View>
);

type AnalyticsChartProps = {
  data: AnalyticsItem[];
  variant?: "pie" | "bar";
  title: string;
};

const AnalyticsChart = ({ data, title, variant }: AnalyticsChartProps) => {
  // TODO: this shouldn't be necessary - used to avoid horizontal overflow
  const windowWidth = useWindowDimensions().width;

  if (variant === "pie") {
    return (
      <PieChart
        title={title}
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
      title={title}
      barProps={{
        data,
        x: "marker",
        y: "count",
      }}
      chartProps={{ width: windowWidth - 40 }}
    />
  );
};

const styles = StyleSheet.create({
  overviewWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  overviewLeftGutter: {
    marginRight: Margin.md,
  },
});
