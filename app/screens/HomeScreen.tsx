import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IndexPath, Select, SelectItem, Spinner } from "@ui-kitten/components";
import { ErrorToast, ExerciseForm, Background, HintCard } from "../components";
import {
  AnalyticsContext,
  ExerciseDefinitionContext,
} from "../services/context";
import { Margin } from "../constants/Sizes";
import { useNavigation } from "@react-navigation/native";
import { ExerciseDefinitionSummary } from "../api";

// TODO: do this on the backend
const sortExercisesAlphabetically = (
  a: ExerciseDefinitionSummary,
  b: ExerciseDefinitionSummary
): number => (a.title > b.title ? 1 : -1);

export default function HomeScreen() {
  const {
    state: {
      definitionSummaries: unsortedDefinitions,
      error,
      loadingDefinitions,
    },
    actions: { getDefinitions },
  } = useContext(ExerciseDefinitionContext);

  const nav = useNavigation();

  const sortedDefinitions = unsortedDefinitions.sort(
    sortExercisesAlphabetically
  );

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
  const selectedDefinition = sortedDefinitions[selectedIndex.row];

  const goToExerciseScreen = useCallback(
    () =>
      nav.navigate("Root", {
        screen: "Exercises",
        params: {
          screen: "ExerciseEditScreen",
        },
      }),
    []
  );

  return (
    <Background>
      <ErrorToast error={error} />
      {loadingDefinitions && (
        <View style={styles.spinner}>
          <Spinner size="giant" />
        </View>
      )}
      {!loadingDefinitions && !sortedDefinitions.length && (
        <HintCard
          title="You've got no exercises!"
          body="Create an exercise to get started"
          link="Create an exercise"
          onPress={goToExerciseScreen}
        />
      )}
      {selectedDefinition && (
        <>
          <Select
            label="Select exercise"
            value={selectedDefinition.title}
            style={styles.picker}
            selectedIndex={selectedIndex}
            onSelect={(i) => {
              const index = i as IndexPath;

              setSelectedIndex(index);
            }}
          >
            {sortedDefinitions.map(({ id, title }) => (
              <SelectItem key={id} title={title} />
            ))}
          </Select>
          <ExerciseForm definition={selectedDefinition} />
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
