import { Card, Toggle } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Margin } from "../../constants/Sizes";
import { ExerciseDefinitionState } from "../../reducers/exerciseDefinition";
import { ExerciseCard } from "../ExerciseCard";

export const PreviousAttempts = ({
  id,
  definitionState,
}: {
  id: string;
  definitionState: ExerciseDefinitionState;
}) => {
  const [showLastActivity, setShowLastActivity] = useState<boolean>(true);
  const [showPersonalBest, setShowPersonalBest] = useState<boolean>(true);

  const { definitions, loading } = definitionState;
  const definition = definitions.find((def) => def.id === id);
  if (definition) {
    const { lastSession, personalBest: pb } = definition;
    if (!lastSession && !pb) {
      return null;
    }
    return (
      <View style={styles.root}>
        <View style={styles.controlWrapper}>
          {!loading && (
            <>
              {pb && pb.topNetExercise && (
                <Toggle
                  checked={showPersonalBest}
                  onChange={setShowPersonalBest}
                >
                  Personal best
                </Toggle>
              )}
              {lastSession && (
                <Toggle
                  checked={showLastActivity}
                  onChange={setShowLastActivity}
                >
                  Last session
                </Toggle>
              )}
            </>
          )}
        </View>
        <Card>
          {showPersonalBest && pb && pb.topNetExercise && (
            <ExerciseCard
              icon="star-outline"
              title="Personal Best"
              exercise={pb.topNetExercise}
              containerStyle={[
                showLastActivity && lastSession && styles.exerciseCard,
              ]}
            />
          )}
          {showLastActivity && lastSession && (
            <ExerciseCard
              icon="clock-outline"
              title="Latest Exercise"
              exercise={lastSession}
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
