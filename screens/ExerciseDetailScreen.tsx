import React, { useEffect, useReducer } from "react";
import { ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import { Text } from "../components/Themed";
import { ExercisesParamList } from "../types";
import { ExerciseDefinition } from "../constants/Interfaces";
import { StackScreenProps } from "@react-navigation/stack";
import {
  exerciseDefinitionActions,
  exerciseDefinitionReducer,
  initialExerciseDefinitionState,
} from "../reducers/exerciseDefinition";
import {
  Background,
  ExerciseCard,
  ExerciseDetailAnalytics,
  ErrorToast,
} from "../components";
import { FontSize, Margin } from "../constants/Sizes";
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
    <ScrollView style={styles.container}>
      {lastSession && (
        <ExerciseCard
          icon="clock-outline"
          containerStyle={styles.exerciseCard}
          title="Latest Exercise"
          exercise={lastSession}
        />
      )}
      {pb && (
        <View>
          <ExerciseCard
            icon="star-outline"
            title="Personal Best"
            exercise={pb.topNetExercise}
            containerStyle={styles.exerciseCard}
          />
          <View style={styles.itemWrapper}>
            <Item label="Top Weight (Avg)" value={pb.topAvgValue.toString()} />
            <Item label="Top Reps" value={pb.topReps.toString()} />
            <Item label="Top Sets" value={pb.topSets.toString()} />
          </View>
        </View>
      )}
      <View style={styles.itemWrapper}>
        {type && <Item label="Type" value={type} />}
        {primaryMuscleGroup && (
          <Item label="Muscles groups" value={primaryMuscleGroup.join(", ")} />
        )}
        {lastImprovement && (
          <Item label="Last improvement" value={`${lastImprovement}%`} />
        )}
      </View>
      {pb && <ExerciseDetailAnalytics history={pb.history} />}
    </ScrollView>
  );
};

const Item = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.item}>
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
  item: {
    alignItems: "center",
  },
  itemWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Margin.md,
  },
  label: {
    color: Colors.grey,
  },
  title: {
    fontSize: FontSize.heading,
    marginBottom: Margin.md,
  },
});
