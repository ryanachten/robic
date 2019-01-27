import * as React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Button, ExerciseCard, FormInput, IconButton, SearchBar } from "..";

import { exerciseDefinitionsQuery } from "../../../queries";

export class ExerciseList extends React.Component {
  public render() {
    const { exerciseDefinitions, loading, onExercisePress } = this.props;
    if (loading) {
      return (
        <View style={styles.noExercisesContainer}>
          <ActivityIndicator size="small" />
        </View>
      );
    }
    const exercises = exerciseDefinitions;
    if (exercises.length === 0) {
      return (
        <View style={styles.noExercisesContainer}>
          <Text style={styles.noExercisesMessage}>
            Oops, looks like you don't have any exercises yet. Click the add
            button above to get started
          </Text>
        </View>
      );
    }
    return exercises.map(exercise => {
      const { history, id, title, unit, personalBest } = exercise;
      // if there is a history, assign last active to latest session date
      const lastActive = () => {
        if (!history) return null;
        return history.length > 0
          ? history[history.length - 1].session.date
          : null;
      };

      return (
        <ExerciseCard
          key={id}
          unit={unit}
          lastActive={lastActive}
          personalBest={personalBest}
          //lastWeightChange={lastWeightChange}
          onPress={() => onExercisePress(exercise)}
          title={title}
        />
      );
    });
  }
}

const styles = StyleSheet.create({
  noExercisesContainer: {
    margin: 20
  },
  noExercisesMessage: {
    textAlign: "center"
  }
});
