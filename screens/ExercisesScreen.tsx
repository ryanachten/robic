import React, { useEffect, useReducer } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Text, View } from "../components/Themed";
import { Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { ExercisesParamList } from "../types";
import {
  exerciseDefinitionReducer,
  exerciseDefinitionActions,
  initialExerciseDefinitionState,
} from "../reducers/exerciseDefinition";
import { ExerciseDefinition } from "../constants/Interfaces";
import { ErrorToast } from "../components/ErrorToast";

type Props = StackScreenProps<ExercisesParamList, "ExercisesScreen">;

export default function ExercisesScreen({ navigation }: Props) {
  const [{ definitions, error, loading }, definitionDispatch] = useReducer(
    exerciseDefinitionReducer,
    initialExerciseDefinitionState
  );

  useEffect(() => {
    exerciseDefinitionActions(definitionDispatch).getDefinitions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercises</Text>
      {loading && <ActivityIndicator size="large" />}
      {definitions?.map(({ id, title }: ExerciseDefinition) => (
        <Button
          key={id}
          title={title}
          onPress={() =>
            navigation.navigate("ExerciseDetailScreen", { definitionId: id })
          }
        ></Button>
      ))}
      <ErrorToast error={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
