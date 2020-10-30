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

  // Set default definition to first item
  // useEffect(() => {
  //   !selectedDefintion && setSelectedDefinition(definitions[0]);
  // }, [definitions]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{firstName}</Text>
      {loading && <ActivityIndicator />}
      <Picker
        note
        placeholder="Select Exercise"
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
