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
import { TouchableOpacity } from "react-native-gesture-handler";
import { format } from "date-fns";

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
      {loading && <ActivityIndicator size="large" />}
      {definitions
        ?.sort((a, b) => {
          const dateA = new Date(a.lastModified);
          const dateB = new Date(b.lastModified);
          // If dates are equal, sort using title alphabetically
          if (dateA.getMilliseconds() === dateB.getMilliseconds()) {
            return a.title > b.title ? 1 : -1;
          }
          // Sort descending by last modified
          return dateA < dateB ? 1 : -1;
        })
        .map(({ id, title, lastModified }: ExerciseDefinition) => (
          <TouchableOpacity
            key={id}
            onPress={() =>
              navigation.navigate("ExerciseDetailScreen", { definitionId: id })
            }
          >
            <Text>{title}</Text>
            <Text>{format(new Date(lastModified), "dd MM yyyy")}</Text>
          </TouchableOpacity>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
