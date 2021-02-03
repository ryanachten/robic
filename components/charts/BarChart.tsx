import React from "react";
import { Text } from "react-native";
import { ChartProps, chartStyles } from "./chartCommon";
import { VictoryAxis, VictoryBar, VictoryLabel } from "victory-native";
import { VictoryBarProps } from "victory-bar";
import { VictoryChart, VictoryTheme } from "victory-native";
import { getColour, getMaxMin } from "./chartUtils";
import { Colors } from "../../constants/Colors";

export type BarChartProps = ChartProps & {
  negative?: boolean;
  barProps?: VictoryBarProps;
};

export const BarChart = ({
  chartProps,
  barProps,
  negative,
  title,
}: BarChartProps) => {
  const maxLabelLength = 8;
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
    <>
      <VictoryChart theme={VictoryTheme.material} {...chartProps}>
        <VictoryBar
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
            <VictoryLabel
              textAnchor="end"
              text={(d) => labels[d.index as number]}
            />
          }
          style={{
            tickLabels: { angle: negative ? 90 : -90 },
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
      <Text style={chartStyles.chartTitle}>{title}</Text>
    </>
  );
};
