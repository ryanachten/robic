import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
import { Colors } from "../constants/Colors";
import { PersonalBestHistory } from "../constants/Interfaces";
import { Margin } from "../constants/Sizes";

type Props = {
  history: PersonalBestHistory[];
};

export const ExerciseDetailAnalytics = ({ history }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  const analyticModes = [
    { value: "avgValue", label: "Weight (Avg)" },
    { value: "netValue", label: "Weight (Net)" },
    { value: "avgReps", label: "Reps" },
    { value: "sets", label: "Sets" },
    { value: "timeTaken", label: "Min / Set" },
  ];
  const analyticMode = analyticModes[selectedIndex.row];

  const data = history.map((h) => ({ ...h, date: new Date(h.date) }));

  return (
    <>
      <Select
        value={analyticMode.label}
        style={styles.picker}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index as IndexPath)}
      >
        {analyticModes.map(({ value, label }) => (
          <SelectItem key={value} title={label} />
        ))}
      </Select>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryLine
          data={data}
          x="date"
          y={analyticMode.value}
          style={{
            data: {
              stroke: Colors.purple,
            },
          }}
        />
      </VictoryChart>
    </>
  );
};

const styles = StyleSheet.create({
  pickerWrapper: {
    marginBottom: Margin.md,
    width: "100%",
  },
  pickerLabel: {
    marginBottom: Margin.sm,
  },
  picker: {
    width: "100%",
  },
});
