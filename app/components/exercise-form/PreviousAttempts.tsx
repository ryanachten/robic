import { Card, Toggle } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Margin } from "../../constants/Sizes";
import { ExerciseDefinitionState } from "../../reducers/exerciseDefinition";
import { ExerciseCard } from "../ExerciseCard";

export const PreviousAttempts = ({
  definitionState,
}: {
  definitionState: ExerciseDefinitionState;
}) => {
  const [showLastActivity, setShowLastActivity] = useState<boolean>(true);
  const [showPersonalBest, setShowPersonalBest] = useState<boolean>(true);

  const { definitionDetail } = definitionState;
  if (definitionDetail) {
    const { latestSession, personalBest: pb } = definitionDetail;
    if (!latestSession && !pb) {
      return null;
    }
    return (
      <View style={styles.root}>
        <View style={styles.controlWrapper}>
          {pb && pb.topNetExercise && (
            <Toggle checked={showPersonalBest} onChange={setShowPersonalBest}>
              Personal best
            </Toggle>
          )}
          {latestSession && (
            <Toggle checked={showLastActivity} onChange={setShowLastActivity}>
              Last session
            </Toggle>
          )}
        </View>
        <Card>
          {showPersonalBest && pb && pb.topNetExercise && (
            <ExerciseCard
              icon="star-outline"
              title="Personal Best"
              exercise={pb.topNetExercise}
              containerStyle={[
                showLastActivity && latestSession && styles.exerciseCard,
              ]}
            />
          )}
          {showLastActivity && latestSession && (
            <ExerciseCard
              icon="clock-outline"
              title="Latest Exercise"
              exercise={latestSession}
            />
          )}
        </Card>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  controlWrapper: {
    display: "flex",
    flexDirection: "row",
    marginBottom: Margin.md,
  },
  exerciseCard: {
    marginBottom: Margin.md,
  },
  root: {
    marginBottom: Margin.md,
  },
});
