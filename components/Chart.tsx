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

export const BarChart = ({ chartProps, barProps, title }: BarChartProps) => {
  return (
    <>
      <VictoryChart theme={VictoryTheme.material} {...chartProps}>
        <VictoryBar
          style={{
            data: {
              fill: Colors.purple,
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
              fill: Colors.purple,
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
