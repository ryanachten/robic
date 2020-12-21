import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Text, ErrorToast, ExerciseForm, Background } from "../components";
import { ExerciseDefintionContext, UserContext } from "../services/context";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { Margin } from "../constants/Sizes";

export default function HomeScreen() {
  const {
    state: { firstName },
  } = useContext(UserContext);

  const {
    state: { definitions, error, loading },
    actions: { getDefinitions },
  } = useContext(ExerciseDefintionContext);

  // Get definitions on mount
  useEffect(() => {
    getDefinitions();
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
          <Select
            label="Select exercise"
            value={selectedDefintion.title}
            style={styles.picker}
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index as IndexPath)}
          >
            {definitions.map(({ id, title }) => (
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
