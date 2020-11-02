import React, { useEffect, useReducer } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Text } from "../components/Themed";
import { ExercisesParamList } from "../types";
import { ExerciseDefinition } from "../constants/Interfaces";
import { StackScreenProps } from "@react-navigation/stack";
import {
  exerciseDefinitionActions,
  exerciseDefinitionReducer,
  initialExerciseDefinitionState,
} from "../reducers/exerciseDefinition";
import { ErrorToast } from "../components/ErrorToast";
import { ExerciseCard } from "../components/ExerciseCard";
import { Background } from "../components";
import { Margin } from "../constants/Sizes";
import { Colors } from "../constants/Colors";

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
    <Background>
      <Text style={styles.title}>{exercise?.title}</Text>
      {loading && <ActivityIndicator size="large" />}
      {exercise && <DefinitionDetail definition={exercise} />}
      <ErrorToast error={error} />
    </Background>
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
    <View style={styles.container}>
      <Text>Unit: {unit}</Text>
      {type && <Text>Type: {type}</Text>}
      {primaryMuscleGroup && (
        <Text>Muscles groups: {primaryMuscleGroup.join(", ")}</Text>
      )}
      {lastImprovement && <Text>Last improvement: {lastImprovement}%</Text>}
      {lastSession && (
        <ExerciseCard
          icon="schedule"
          containerStyle={styles.exerciseCard}
          title="Latest Exercise"
          exercise={lastSession}
        />
      )}
      {pb && (
        <View>
          <ExerciseCard
            icon="star"
            title="Personal Best"
            exercise={pb.topNetExercise}
            containerStyle={styles.exerciseCard}
          />
          <View style={styles.pbWrapper}>
            <Item label="Top Weight (Avg)" value={pb.topAvgValue.toString()} />
            <Item label="Top Reps" value={pb.topReps.toString()} />
            <Item label="Top Sets" value={pb.topSets.toString()} />
          </View>
        </View>
      )}
    </View>
  );
};

const Item = ({ label, value }: { label: string; value: string }) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <Text>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  exerciseCard: {
    marginBottom: Margin.md,
  },
  pbWrapper: {
    flexDirection: "row",
  },
  label: {
    color: Colors.grey,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
