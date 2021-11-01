import React from "react";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import { VictoryLineProps } from "victory-line";
import { ChartProps } from "./chartCommon";
import { Colors } from "../../constants/Colors";
import { format } from "date-fns";

export type LineChartProps = ChartProps & {
  lineProps: VictoryLineProps;
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
      <VictoryAxis
        // TODO: we'll need to move these into props if we need labels which aren't dates
        tickCount={4}
        tickLabelComponent={
          <VictoryLabel text={(d) => format(d.datum, "MMM do")} />
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
  );
};
