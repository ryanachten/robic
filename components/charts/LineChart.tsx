import React from "react";
import { VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
import { VictoryLineProps } from "victory-line";
import { ChartProps } from "./chartCommon";
import { Colors } from "../../constants/Colors";

export type LineChartProps = ChartProps & {
  lineProps?: VictoryLineProps;
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
