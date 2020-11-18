import React from "react";
import { VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
import { Colors } from "../constants/Colors";
import { PersonalBestHistory } from "../constants/Interfaces";

type Props = {
  history: PersonalBestHistory[];
};

export const ExerciseDetailAnalytics = ({ history }: Props) => {
  const data = history.map((h) => ({ ...h, date: new Date(h.date) }));
  return (
    <VictoryChart width={350} theme={VictoryTheme.material}>
      <VictoryLine
        data={data}
        x="date"
        y="netValue"
        style={{
          data: {
            stroke: Colors.purple,
          },
        }}
      />
    </VictoryChart>
  );
};
