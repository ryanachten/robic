import React, { useEffect, useReducer } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Text, View } from "../components/Themed";
import { ExercisesParamList } from "../types";
import { ExerciseDefinition } from "../constants/Interfaces";
import { StackScreenProps } from "@react-navigation/stack";
import {
  exerciseDefinitionActions,
  exerciseDefinitionReducer,
  initialExerciseDefinitionState,
} from "../reducers/exerciseDefinition";
import { ErrorToast } from "../components/ErrorToast";
import { formatDistance } from "date-fns";

type Props = StackScreenProps<ExercisesParamList, "ExerciseDetailScreen">;

export default function ExerciseDetailScreen({ route }: Props) {
  const definitionId = route.params ? route.params.definitionId : null;

  const [{ definitions, error, loading }, definitionDispatch] = useReducer(
    exerciseDefinitionReducer,
    initialExerciseDefinitionState
  );

  useEffect(() => {
    definitionId &&
      exerciseDefinitionActions(definitionDispatch).getDefinitionById(
        definitionId
      );
  }, []);

  const exercise = definitions.find((def) => def.id === definitionId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise?.title}</Text>
      {loading && <ActivityIndicator size="large" />}
      {exercise && <DefinitionDetail definition={exercise} />}
      <ErrorToast error={error} />
    </View>
  );
}

const DefinitionDetail = ({
  definition,
}: {
  definition: ExerciseDefinition;
}) => {
  const {
    unit,
    type,
    primaryMuscleGroup,
    lastSession,
    lastImprovement,
    personalBest: pb,
  } = definition;
  return (
    <View>
      <Text>Unit: {unit}</Text>
      {type && <Text>Type: {type}</Text>}
      {lastSession && (
        <Text>
          Last active:{" "}
          {`${formatDistance(new Date(lastSession.date), Date.now())} ago`}
        </Text>
      )}
      {lastImprovement && <Text>Last improvement: {lastImprovement}%</Text>}
      {primaryMuscleGroup && (
        <Text>Muscles groups: {primaryMuscleGroup.join(", ")}</Text>
      )}
      {pb && (
        <View>
          <Text>
            {`Personal Best ${formatDistance(
              new Date(pb.topNetExercise.date),
              Date.now()
            )} ago`}
          </Text>
          {pb.topNetExercise.sets.map((s, i) => (
            <Text key={i}>{`${s.reps} reps x ${s.value} kg`}</Text>
          ))}
          <Text>Top average value: {pb.topAvgValue}</Text>
          <Text>Top reps: {pb.topReps}</Text>
          <Text>Top sets: {pb.topSets}</Text>
        </View>
      )}
    </View>
  );
};

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
