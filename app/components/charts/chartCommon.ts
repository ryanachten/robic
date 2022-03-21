import { VictoryChartProps } from "victory-chart";
import { VictoryGroupProps } from "victory-group";

export type ChartProps = {
  title?: string;
  chartProps?: VictoryChartProps;
};

export type GroupProps = {
  title?: string;
  chartProps?: VictoryGroupProps;
};
