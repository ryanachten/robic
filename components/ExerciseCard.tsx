import { formatDistance } from "date-fns";
import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";
import { Exercise } from "../constants/Interfaces";
import { Margin } from "../constants/Sizes";
import { boxShadowStyles, Colors } from "../constants/Colors";
import { Icon } from "./Icon";

type ExerciseCardProps = {
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  icon: string;
  exercise: Exercise;
};

export const ExerciseCard = ({
  containerStyle,
  title,
  icon,
  exercise: { date, sets },
}: ExerciseCardProps) => (
  <View style={[styles.container, containerStyle]}>
    <View style={styles.titleWrapper}>
      <Icon size="sm" fill={Colors.orange} name={icon} />
      <Text style={styles.title}>{`${title} ${formatDistance(
        new Date(date),
        Date.now()
      )} ago`}</Text>
    </View>
    <View style={styles.setWrapper}>
      {sets.map(({ reps, value }, i) => (
        <Text key={i}>{`${reps} reps x ${value} kg`}</Text>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: Margin.md,
    ...boxShadowStyles,
  },
  setWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  title: {
    marginLeft: Margin.sm,
    marginBottom: Margin.sm,
  },
  titleWrapper: {
    flexDirection: "row",
  },
});
