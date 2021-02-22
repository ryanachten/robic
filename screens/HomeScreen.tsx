import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IndexPath, Select, SelectItem, Spinner } from "@ui-kitten/components";
import { ErrorToast, ExerciseForm, Background, HintCard } from "../components";
import {
  AnalyticsContext,
  ExerciseDefintionContext,
} from "../services/context";
import { Margin } from "../constants/Sizes";
import { useNavigation } from "@react-navigation/native";
import { ExerciseDefinition } from "../constants/Interfaces";

const sortExercisesAlphabetically = (
  a: ExerciseDefinition,
  b: ExerciseDefinition
): number => (a.title > b.title ? 1 : -1);

export default function HomeScreen() {
  const {
    state: { definitions, error, loading },
    actions: { getDefinitions },
  } = useContext(ExerciseDefintionContext);

  const {
    actions: { getAnalytics },
  } = useContext(AnalyticsContext);

  // Get definitions and analytics on mount
  useEffect(() => {
    getDefinitions();
    getAnalytics();
  }, []);

  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  const selectedDefintion = definitions[selectedIndex.row];

  const nav = useNavigation();
  const goToExerciseScreen = () => nav.navigate("Exercises");

  return (
    <Background>
      <ErrorToast error={error} />
      {loading && (
        <View style={styles.spinner}>
          <Spinner size="giant" />
        </View>
      )}
      {!loading && !definitions.length && (
        <HintCard
          title="You've got no exercises!"
          body="Create an exercise to get started"
          link="Create an exercise"
          onPress={goToExerciseScreen}
        />
      )}
      {selectedDefintion && (
        <>
          <Select
            label="Select exercise"
            value={selectedDefintion.title}
            style={styles.picker}
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index as IndexPath)}
          >
            {definitions
              .sort(sortExercisesAlphabetically)
              .map(({ id, title }) => (
                <SelectItem key={id} title={title} />
              ))}
          </Select>
          <ExerciseForm definition={selectedDefintion} />
        </>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
  picker: {
    marginBottom: Margin.md,
    width: "100%",
  },
  spinner: {
    marginBottom: Margin.md,
  },
});
