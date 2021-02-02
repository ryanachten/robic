import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
} from "victory-native";
import { VictoryChartProps } from "victory-chart";
import { VictoryBarProps } from "victory-bar";
import { VictoryLineProps } from "victory-line";
import { VictoryPieProps } from "victory-pie";
import { VictoryGroupProps } from "victory-group";
import { Colors } from "../constants/Colors";
import { Margin } from "../constants/Sizes";
import { lerpColor } from "../utilities/styleHelpers";

export type ChartProps = {
  title?: string;
  chartProps?: VictoryChartProps;
};

export type GroupProps = {
  title?: string;
  chartProps?: VictoryGroupProps;
};

export type LineChartProps = ChartProps & {
  lineProps?: VictoryLineProps;
};

export type BarChartProps = ChartProps & {
  barProps?: VictoryBarProps;
};

export type PieChartProps = GroupProps & {
  pieProps?: VictoryPieProps;
};

export const LineChart = ({ chartProps, lineProps }: LineChartProps) => {
  return (
    <VictoryChart theme={VictoryTheme.material} {...chartProps}>
      <VictoryLine
        style={{
          data: {
            stroke: Colors.purple,
          },
        }}
        {...lineProps}
      />
    </VictoryChart>
  );
};

const getMaxMin = (props?: VictoryBarProps): { max?: number; min?: number } => {
  let max, min;
  if (props && props.x && props.data) {
    const data: number[] = props.data.map((d) => d[props.y as string]);
    max = Math.max(...data);
    min = Math.min(...data);
  }
  return { max, min };
};

const getColour = ({
  y,
  defaultColor,
  max,
  min,
}: {
  y: number;
  defaultColor: string;
  max?: number;
  min?: number;
}): string => {
  let colour;
  // Handle positive colour range
  if (y >= 0 && max) {
    const percent = y / max;
    colour = lerpColor(Colors.orange, Colors.red, percent);
  }
  // Handle negative colour range
  else if (y < 0 && min) {
    const percent = Math.abs(y) / Math.abs(min);
    colour = lerpColor(Colors.orange, Colors.purple, percent);
  }
  // Handle edge cases where max or min
  else {
    return defaultColor;
  }

  // Handle error contexts
  if (colour === "#") {
    return defaultColor;
  }

  return colour;
};

export const BarChart = ({ chartProps, barProps, title }: BarChartProps) => {
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
            tickLabels: { angle: -90 },
            grid: { stroke: "none" },
          }}
        />
      </VictoryChart>
      <Text style={styles.chartTitle}>{title}</Text>
    </>
  );
};

export const PieChart = ({ chartProps, pieProps, title }: PieChartProps) => {
  return (
    <>
      <VictoryGroup
        theme={VictoryTheme.material}
        {...chartProps}
        style={{
          parent: {
            display: "flex",
            alignItems: "center",
          },
        }}
      >
        <VictoryPie
          labelPosition="centroid"
          labelPlacement="parallel"
          style={{
            data: {
              fill: (d) => {
                const percent = (d.datum.endAngle - d.datum.startAngle) / 360;
                return lerpColor(Colors.orange, Colors.red, percent);
              },
            },
          }}
          {...pieProps}
        />
      </VictoryGroup>
      <Text style={styles.groupTitle}>{title}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  chartTitle: {
    marginTop: Margin.md,
    textAlign: "center",
  },
  groupTitle: {
    textAlign: "center",
  },
});
