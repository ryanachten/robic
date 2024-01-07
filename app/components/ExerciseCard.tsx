import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";
import { Exercise } from "../api";
import { Margin } from "../constants/Sizes";
import { Colors } from "../constants/Colors";
import { Icon } from "./Icon";
import { formatRelativeDate } from "../utilities/dateHelpers";

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
  <View style={containerStyle}>
    <View style={styles.titleWrapper}>
      <Icon size="sm" fill={Colors.orange} name={icon} />
      <Text style={styles.title}>{`${title} ${formatRelativeDate(date)}`}</Text>
    </View>
    <View style={styles.setWrapper}>
      {sets.map(({ reps, value }, i) => (
        <Text key={i}>{`${reps} reps x ${value} kg`}</Text>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
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
