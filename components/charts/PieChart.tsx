import React from "react";
import { StyleSheet, Text } from "react-native";
import { VictoryGroup, VictoryPie, VictoryTheme } from "victory-native";
import { VictoryPieProps } from "victory-pie";
import { Colors } from "../../constants/Colors";
import { Margin } from "../../constants/Sizes";
import { lerpColor } from "../../utilities/styleHelpers";
import { GroupProps } from "./chartCommon";

export type PieChartProps = GroupProps & {
  pieProps?: VictoryPieProps;
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
    marginTop: Margin.sm,
    textAlign: "center",
  },
  groupTitle: {
    textAlign: "center",
  },
});
