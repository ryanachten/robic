import React, {
  useContext,
  useReducer,
  useEffect,
  useState,
  Dispatch,
} from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { Picker } from "native-base";
import { Text, ErrorToast, ExerciseForm, Background } from "../components";
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
    <Background>
      {!selectedDefintion && (
        <Text style={styles.title}>Hello {firstName}!</Text>
      )}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.pickerWrapper}>
          <Text>Select an exercise:</Text>
          <Picker
            note
            placeholder="No excercise selected"
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
        </View>
      )}
      {selectedDefintion && <ExerciseForm definition={selectedDefintion} />}
      <ErrorToast error={error} />
    </Background>
  );
}

const styles = StyleSheet.create({
  pickerWrapper: {
    alignItems: "center",
    flexDirection: "row",
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
