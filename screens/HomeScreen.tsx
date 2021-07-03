import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
    state: { definitions: unsortedDefintions, error, loading },
    actions: { getDefinitions },
  } = useContext(ExerciseDefintionContext);

  const nav = useNavigation();

  const sortedDefinitions = useMemo(
    () => unsortedDefintions.sort(sortExercisesAlphabetically),
    [unsortedDefintions]
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
  const selectedDefintion = sortedDefinitions[selectedIndex.row];

  const goToExerciseScreen = useCallback(
    () =>
      nav.navigate("Exercises", {
        screen: "ExerciseEditScreen",
      }),
    []
  );

  return (
    <Background>
      <ErrorToast error={error} />
      {loading && (
        <View style={styles.spinner}>
          <Spinner size="giant" />
        </View>
      )}
      {!loading && !sortedDefinitions.length && (
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
            onSelect={(i) => {
              const index = i as IndexPath;

              setSelectedIndex(index);
            }}
          >
            {sortedDefinitions.map(({ id, title }) => (
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
