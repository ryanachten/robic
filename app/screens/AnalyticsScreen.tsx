import { Spinner, Text } from "@ui-kitten/components";
import React, { useContext } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { Background, BarChart, ErrorToast, PieChart } from "../components";
import { AnalyticsItem } from "../constants/Interfaces";
import { Margin } from "../constants/Sizes";
import { AnalyticsContext } from "../services/context";

export default function AnalyticsScreen() {
  const {
    state: { analytics, loadingAnalytics, error },
    actions: { getAnalytics },
  } = useContext(AnalyticsContext);

  // TODO: this limit should be sent to the backend and used in query
  const resultsPerChart = 5;

  return (
    <Background style={{ padding: 0 }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loadingAnalytics && Boolean(analytics)}
            onRefresh={() => getAnalytics()}
          />
        }
      >
        {analytics ? (
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
              title="Most exercise progress"
              data={analytics.exerciseProgress.splice(0, resultsPerChart)}
            />
          </>
        ) : (
          <View style={styles.spinner}>
            <Spinner size="giant" />
          </View>
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
  containerStyle?: StyleProp<ViewStyle>;
};

const AnalyticsChart = ({
  data,
  containerStyle,
  title,
  variant,
}: AnalyticsChartProps) => {
  // TODO: this shouldn't be necessary - used to avoid horizontal overflow
  const windowWidth = useWindowDimensions().width;

  if (variant === "pie") {
    return (
      <PieChart
        title={title}
        pieProps={{
          data,
          radius: windowWidth / 4,
          x: "marker",
          y: "count",
        }}
      />
    );
  }
  return (
    <BarChart
      containerStyle={containerStyle}
      title={title}
      barProps={{
        data,
        x: "marker",
        y: "count",
      }}
    />
  );
};

const styles = StyleSheet.create({
  overviewWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: Margin.lg,
    marginTop: Margin.md,
  },
  overviewLeftGutter: {
    marginRight: Margin.md,
  },
  spinner: {
    marginTop: Margin.md,
  },
});
