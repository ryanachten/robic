import { formatDistance } from "date-fns";
import React from "react";
import { Text, View } from "react-native";
import { Exercise } from "../constants/Interfaces";

export const ExerciseCard = ({
  title,
  exercise: { date, sets },
}: {
  title: string;
  exercise: Exercise;
}) => (
  <View>
    <Text>{`${title} ${formatDistance(new Date(date), Date.now())} ago`}</Text>
    {sets.map(({ reps, value }, i) => (
      <Text key={i}>{`${reps} reps x ${value} kg`}</Text>
    ))}
  </View>
);
