import * as React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Button, FormInput, IconButton, SearchBar, SessionCard } from "..";

export class SessionList extends React.Component {
  public render() {
    const { loading, onSessionPress, sessionDefinitions } = this.props;
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
    return sessions.map(session => {
      const { exercises, history, title } = session;
      // if there is a history, assign last active to latest session date
      const lastActive =
        history.length > 0 ? history[history.length - 1].date : null;
      return (
        <SessionCard
          excerciseCount={exercises.length}
          key={title}
          lastActive={lastActive}
          onPress={() => onSessionPress(session)}
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
