import * as React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Button, FormInput, IconButton, SearchBar, SessionCard } from "..";

import { exerciseDefinitionsQuery } from "../../../queries";

export class SessionList extends React.Component {
  public render() {
    const { sessionDefinitions, loading, onExercisePress } = this.props;
    if (loading) {
      return (
        <View style={styles.noSessionsContainer}>
          <ActivityIndicator size="small" />
        </View>
      );
    }
    const sessions = sessionDefinitions;
    if (sessions.length === 0) {
      return (
        <View style={styles.noSessionsContainer}>
          <Text style={styles.noSessionsMessage}>
            Oops, looks like you don't have any sessions yet. Click the add
            button above to get started
          </Text>
        </View>
      );
    }
    return sessions.map(exercise => {
      const { history, title, unit, personalBest } = exercise;
      // if there is a history, assign last active to latest session date
      const lastActive =
        history.length > 0 ? history[history.length - 1].session.date : null;
      return null;
      return (
        <SessionCard
          key={title}
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
  noSessionsContainer: {
    margin: 20
  },
  noSessionsMessage: {
    textAlign: "center"
  }
});
