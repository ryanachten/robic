import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { IndexPath, Select, SelectItem, Spinner } from "@ui-kitten/components";
import * as actions from "../actions";
import { ErrorToast, ExerciseForm, Background, HintCard } from "../components";
import { AnalyticsContext } from "../services/context";
import { Margin } from "../constants/Sizes";
import { useNavigation } from "@react-navigation/native";
import {
  getDefinitionError,
  getSortedDefintionsByTitle,
  isDefinitionsLoading,
} from "../selectors/exerciseDefinition.selectors";

export default function HomeScreen() {
  const nav = useNavigation();
  const dispatch = useDispatch();

  const error = useSelector(getDefinitionError);
  const loading = useSelector(isDefinitionsLoading);
  const sortedDefinitions = useSelector(getSortedDefintionsByTitle);

  const {
    actions: { getAnalytics },
  } = useContext(AnalyticsContext);

  const fetchDefinitions = () =>
    dispatch(actions.requestDefinitions.started(undefined));

  // Get definitions and analytics on mount
  useEffect(() => {
    fetchDefinitions();
    getAnalytics();
  }, []);

  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  const selectedDefinition = sortedDefinitions[selectedIndex.row];

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
