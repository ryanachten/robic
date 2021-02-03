import { StyleSheet } from "react-native";
import { VictoryChartProps } from "victory-chart";
import { VictoryGroupProps } from "victory-group";
import { Margin } from "../../constants/Sizes";

export type ChartProps = {
  title?: string;
  chartProps?: VictoryChartProps;
};

export type GroupProps = {
  title?: string;
  chartProps?: VictoryGroupProps;
};

export const chartStyles = StyleSheet.create({
  chartTitle: {
    marginTop: Margin.sm,
    textAlign: "center",
  },
  groupTitle: {
    textAlign: "center",
  },
});
