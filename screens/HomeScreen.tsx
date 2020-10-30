import React, {
  useContext,
  useReducer,
  useEffect,
  useState,
  Dispatch,
} from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Picker } from "native-base";
import { Text, ErrorToast, ExerciseForm } from "../components";
import { UserContext } from "../services/context";
import {
  exerciseDefinitionReducer,
  initialExerciseDefinitionState,
  exerciseDefinitionActions,
} from "../reducers/exerciseDefinition";
import { ExerciseDefinition } from "../constants/Interfaces";
import { Margin } from "../constants/Sizes";

export default function HomeScreen() {
  const {
    state: { firstName },
  } = useContext(UserContext);

  const [{ definitions, error, loading }, definitionDispatch] = useReducer(
    exerciseDefinitionReducer,
    initialExerciseDefinitionState
  );

  const [selectedDefintion, setSelectedDefinition]: [
    ExerciseDefinition | undefined,
    Dispatch<ExerciseDefinition>
  ] = useState();

  // Get definitions on mount
  useEffect(() => {
    exerciseDefinitionActions(definitionDispatch).getDefinitions();
  }, []);

  return (
    <View style={styles.container}>
      {!selectedDefintion && (
        <Text style={styles.title}>Hello {firstName}!</Text>
      )}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>Select an exercise:</Text>
          <Picker
            note
            placeholder="No excercise selected"
            style={{ width: 120 }}
            selectedValue={selectedDefintion?.id}
            onValueChange={(id) => {
              const definition = definitions.find((def) => def.id === id);
              definition && setSelectedDefinition(definition);
            }}
          >
            {definitions.map((defintion) => {
              const { title, id } = defintion;
              return <Picker.Item key={id} label={title} value={id} />;
            })}
          </Picker>
        </>
      )}
      {selectedDefintion && <ExerciseForm definition={selectedDefintion} />}
      <ErrorToast error={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: Margin.md,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
