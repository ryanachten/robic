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

const getMaxValue = (props: VictoryBarProps): number | null => {
  if (props && props.x && props.data) {
    const data: number[] = props.data.map((d) => d[props.y as string]);
    const max = Math.max(...data);
    return max;
  }
  return null;
};

export const BarChart = ({ chartProps, barProps, title }: BarChartProps) => {
  const max = barProps && getMaxValue(barProps);
  return (
    <>
      <VictoryChart theme={VictoryTheme.material} {...chartProps}>
        <VictoryBar
          style={{
            data: {
              fill: (d) => {
                if (barProps && barProps.y && max) {
                  const percent = d.datum[barProps.y as string] / max;
                  return lerpColor(Colors.orange, Colors.red, percent);
                }
                return Colors.orange;
              },
            },
          }}
          {...barProps}
        />
        <VictoryAxis
          tickLabelComponent={<VictoryLabel textAnchor="end" />}
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
