import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "@ui-kitten/components";
import { FormSet, Set } from "../../constants/Interfaces";
import { Margin } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";
import { useSelector } from "react-redux";
import { getDefinitionById } from "../../selectors/exerciseDefinition.selectors";

const netWeightReducer = (accumulator: number, { reps, value }: Set) =>
  (accumulator += reps * value);

const netWeightFormReducer = (accumulator: number, { reps, value }: FormSet) =>
  (accumulator += parseFloat(reps) * parseFloat(value));

const totalRepReducer = (accumulator: number, { reps }: Set) =>
  (accumulator += reps);

export const EffortTillPersonalBest = ({
  id,
  currentSets,
}: {
  id: string;
  currentSets: FormSet[];
}) => {
  const definition = useSelector(getDefinitionById(id));
  const pb = definition?.personalBest?.topNetExercise;
  if (!pb) {
    return null;
  }
  const pbTotal = pb.sets.reduce(netWeightReducer, 0);
  const currentTotal = currentSets.reduce(netWeightFormReducer, 0);
  if (isNaN(currentTotal) || isNaN(pbTotal)) {
    return null;
  }

  if (pbTotal >= currentTotal) {
    const pbSetCount = pb.sets.length;
    const pbAvgReps = Math.floor(
      pb.sets.reduce(totalRepReducer, 0) / pbSetCount
    );
    const totalGoal = pbTotal + 10;
    const remainingTotal = totalGoal - currentTotal;
    const remainingSetCount =
      pbSetCount > currentSets.length ? pbSetCount - currentSets.length : 1;

    const remainingSetValue = Math.abs(
      remainingTotal / pbAvgReps / remainingSetCount
    ).toFixed(2);
    const message = `${remainingSetValue}kg x ${pbAvgReps} reps x ${remainingSetCount} sets remaining until new personal best! (${totalGoal}kg)`;
    return (
      <Card style={styles.card} status="basic">
        <Text style={styles.text}>{message}</Text>
      </Card>
    );
  } else {
    const message = `Congratulations! New personal best of ${currentTotal}kg (+${
      currentTotal - pbTotal
    }kg)`;
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
