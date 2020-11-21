import React, { useContext, useReducer, useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { Text, ErrorToast, ExerciseForm, Background } from "../components";
import { UserContext } from "../services/context";
import {
  exerciseDefinitionReducer,
  initialExerciseDefinitionState,
  exerciseDefinitionActions,
} from "../reducers/exerciseDefinition";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { Margin } from "../constants/Sizes";

export default function HomeScreen() {
  const {
    state: { firstName },
  } = useContext(UserContext);

  const [{ definitions, error, loading }, definitionDispatch] = useReducer(
    exerciseDefinitionReducer,
    initialExerciseDefinitionState
  );

  // Get definitions on mount
  useEffect(() => {
    exerciseDefinitionActions(definitionDispatch).getDefinitions();
  }, []);

  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  const selectedDefintion = definitions[selectedIndex.row];

  return (
    <Background>
      <ErrorToast error={error} />
      {!selectedDefintion && (
        <Text style={styles.title}>Hello {firstName}!</Text>
      )}
      {loading && <ActivityIndicator />}
      {selectedDefintion && (
        <>
          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerLabel}>Select an exercise:</Text>
            <Select
              value={selectedDefintion.title}
              style={styles.picker}
              selectedIndex={selectedIndex}
              onSelect={(index) => setSelectedIndex(index as IndexPath)}
            >
              {definitions.map(({ id, title }) => (
                <SelectItem key={id} title={title} />
              ))}
            </Select>
          </View>
          <ExerciseForm definition={selectedDefintion} />
        </>
      )}
    </Background>
  );
}

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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
