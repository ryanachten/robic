import React, { useEffect, useReducer } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
} from "victory-native";
import { Background, ErrorToast, Text } from "../components";
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

  return (
    <Background>
      {loading && <ActivityIndicator size="large" />}
      <ScrollView>
        {analytics && (
          <>
            <BarChart
              title="Muscle group frequency"
              data={analytics.muscleGroupFrequency}
            />
            <BarChart
              title="Exercises frequency"
              data={analytics.exerciseFrequency}
            />
            <BarChart
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
  title: string;
};

const BarChart = ({ data, title }: BarChartProps) => {
  // TODO: this shouldn't be necessary - used to avoid horizontal overflow
  const chartWidth = useWindowDimensions().width - 40;
  return (
    <View>
      <VictoryChart theme={VictoryTheme.material} width={chartWidth}>
        <VictoryBar data={data} x="marker" y="count" />
        <VictoryAxis
          tickLabelComponent={<VictoryLabel textAnchor="end" />}
          style={{ tickLabels: { angle: -90 } }}
        />
      </VictoryChart>
      <Text style={styles.chartTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chartTitle: {
    marginTop: Margin.md,
    textAlign: "center",
  },
});
