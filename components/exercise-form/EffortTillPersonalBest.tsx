import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "@ui-kitten/components";
import { Set } from "../../constants/Interfaces";
import { ExerciseDefinitionState } from "../../reducers/exerciseDefinition";
import { Margin } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";

const netWeightReducer = (accumulator: number, { reps, value }: Set) =>
  (accumulator += reps * value);

const totalRepReducer = (accumulator: number, { reps }: Set) =>
  (accumulator += reps);

export const EffortTillPersonalBest = ({
  id,
  currentSets,
  definitionState,
}: {
  id: string;
  currentSets: Set[];
  definitionState: ExerciseDefinitionState;
}) => {
  const { definitions } = definitionState;
  const definition = definitions.find((def) => def.id === id);
  const pb = definition?.personalBest?.topNetExercise;
  if (!pb) {
    return null;
  }
  const pbTotal = pb.sets.reduce(netWeightReducer, 0);
  const currentTotal = currentSets.reduce(netWeightReducer, 0);
  if (pbTotal >= currentTotal) {
    const pbSetCount = pb.sets.length;
    const pbAvgReps = Math.floor(
      pb.sets.reduce(totalRepReducer, 0) / pbSetCount
    );
    const totalGoal = currentTotal + 10;
    const remainingTotal = pbTotal - totalGoal;
    const remainingSetCount = pbSetCount - currentSets.length || 1;
    console.log(
      "pbSetCount",
      pbSetCount,
      "currentSets.length",
      currentSets.length
    );

    const remainingSetValue = Math.abs(
      remainingTotal / pbAvgReps / remainingSetCount
    );
    const message = `${remainingSetValue}kg x ${pbAvgReps} reps x ${remainingSetCount} sets remaining until new personal best! (${totalGoal}kg)`;
    return (
      <Card style={styles.card} status="basic">
        <Text style={styles.text}>{message}</Text>
      </Card>
    );
  } else {
    const message = `Congratulations! New personal best of ${currentTotal}kg`;
    return (
      <Card style={styles.card} status="primary">
        <Text style={[styles.text, styles.textSuccess]}>{message}</Text>
      </Card>
    );
  }
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Margin.md,
  },
  text: {
    color: Colors.grey,
    textAlign: "center",
  },
  textSuccess: {
    color: Colors.orange,
  },
});
