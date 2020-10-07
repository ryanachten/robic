import React, { useEffect, useReducer } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Text, View } from "../components/Themed";
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
        ?.sort(sortExercises)
        .map(
          ({ id, title, lastActive, lastImprovement }: ExerciseDefinition) => (
            <TouchableOpacity
              key={id}
              onPress={() =>
                navigation.navigate("ExerciseDetailScreen", {
                  definitionId: id,
                })
              }
            >
              <Text>{title}</Text>
              {lastActive && (
                <Text>{format(new Date(lastActive), "dd MM yyyy")}</Text>
              )}
              {lastImprovement && <Text>{lastImprovement}</Text>}
            </TouchableOpacity>
          )
        )}
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

const sortExercises = (
  a: ExerciseDefinition,
  b: ExerciseDefinition
): 1 | -1 => {
  // Alphbetical sort fallback
  const sortAlpha = () => (a.title > b.title ? 1 : -1);

  // Handle date sorting
  const dateA = a.lastActive && new Date(a.lastActive);
  const dateB = b.lastActive && new Date(b.lastActive);
  if (dateA instanceof Date && dateB instanceof Date) {
    if (dateA.getMilliseconds() === dateB.getMilliseconds()) {
      return sortAlpha();
    }
    return dateA < dateB ? 1 : -1;
  }

  // Handle cases where dates don't exist
  if (dateA && !dateB) {
    return -1;
  } else if (!dateA && dateB) {
    return 1;
  }
  return sortAlpha();
};
