import { Card, Text } from "@ui-kitten/components/ui";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { ExerciseDefinition } from "../../constants/Interfaces";
import { Margin } from "../../constants/Sizes";
import { ExerciseCard } from "../ExerciseCard";
import { ExerciseDetailAnalytics } from "./ExerciseDetailAnalytics";

export const DefinitionDetail = ({
  definition,
}: {
  definition: ExerciseDefinition;
}) => {
  const {
    history,
    primaryMuscleGroup,
    latestSession,
    // lastImprovement, // TODO: return as part of detail response
    personalBest: pb,
  } = definition;

  return (
    <>
      {(latestSession || pb) && (
        <Card style={styles.exerciseCards}>
          {latestSession && (
            <ExerciseCard
              icon="clock-outline"
              containerStyle={styles.exerciseCard}
              title="Latest Exercise"
              exercise={latestSession}
            />
          )}
          {pb && pb.topNetExercise && (
            <ExerciseCard
              icon="star-outline"
              title="Personal Best"
              exercise={pb.topNetExercise}
            />
          )}
        </Card>
      )}
      {pb && (
        <View style={styles.itemWrapper}>
          <Item label="Top Weight (Avg)" value={pb.topAvgValue} />
          <Item label="Top Reps" value={pb.topReps} />
          <Item label="Top Sets" value={pb.topSets} />
        </View>
      )}
      <View style={styles.itemWrapper}>
        {primaryMuscleGroup && (
          <Item label="Muscles groups" value={primaryMuscleGroup.join(", ")} />
        )}
        {/* {lastImprovement ? (
          <Item label="Last improvement" value={`${lastImprovement}%`} />
        ) : null} */}
      </View>
      {pb && <ExerciseDetailAnalytics history={history} />}
    </>
  );
};

const Item = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}</Text>
    <Text>{value ?? "--"}</Text>
  </View>
);

const styles = StyleSheet.create({
  exerciseCard: {
    marginBottom: Margin.md,
  },
  exerciseCards: {
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
});
