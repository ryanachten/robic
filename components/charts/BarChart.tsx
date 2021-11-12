import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { ChartProps } from "./chartCommon";
import { VictoryAxis, VictoryBar, VictoryLabel } from "victory-native";
import { VictoryBarProps } from "victory-bar";
import { VictoryChart, VictoryTheme } from "victory-native";
import { getColour, getMaxMin } from "./chartUtils";
import { Colors } from "../../constants/Colors";
import { Margin } from "../../constants/Sizes";

export type BarChartProps = ChartProps & {
  barProps?: VictoryBarProps;
  containerStyle?: StyleProp<ViewStyle>;
};

export const BarChart = ({
  chartProps,
  barProps,
  containerStyle,
  title,
}: BarChartProps) => {
  const maxLabelLength = 11;
  const { max, min } = getMaxMin(barProps);
  const defaultColor = Colors.orange;
  const labels: string[] = [];
  if (barProps && barProps.data) {
    barProps.data.map((d) => {
      const marker = d.marker as string;
      const label =
        marker.length > maxLabelLength
          ? `${marker.slice(0, maxLabelLength - 2)}..`
          : marker;
      labels.push(label);
    });
  }
  return (
    <View style={containerStyle}>
      <VictoryChart theme={VictoryTheme.material} {...chartProps}>
        <VictoryBar
          animate={true}
          barRatio={0.8}
          domainPadding={{ x: 25 }}
          style={{
            data: {
              fill: (d) => {
                if (barProps) {
                  const y = d.datum[barProps.y as string];
                  return getColour({ y, max, min, defaultColor });
                }
                return defaultColor;
              },
            },
          }}
          {...barProps}
        />
        <VictoryAxis
          tickLabelComponent={
            <VictoryLabel text={(d) => labels[d.index as number]} />
          }
          style={{
            grid: { stroke: "none" },
          }}
        />
        <VictoryAxis
          dependentAxis={true}
          style={{
            grid: { stroke: "none" },
          }}
        />
      </VictoryChart>
      <Text style={styles.chartTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chartTitle: {
    marginTop: Margin.sm,
    textAlign: "center",
  },
});
