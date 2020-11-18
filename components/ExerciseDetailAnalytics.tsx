import React from "react";
import { VictoryChart, VictoryBar, VictoryTheme } from "victory-native";
import { PersonalBestHistory } from "../constants/Interfaces";

type Props = {
  history: PersonalBestHistory[];
};

export const ExerciseDetailAnalytics = ({ history }: Props) => {
  const data = history.map((h) => ({ ...h, date: new Date(h.date) }));
  return (
    <VictoryChart width={350} theme={VictoryTheme.material}>
      <VictoryBar data={data} x="date" y="netValue" />
    </VictoryChart>
  );
};
