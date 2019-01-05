import * as React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import {
  Button,
  LogOutButton,
  ScreenHeader,
  SearchBar,
  SessionCard
} from "../../components";
import sessions from "../../mock_data/sessions";

class Sessions extends React.Component {
  public static navigationOptions = {
    title: "Sessions",
    headerRight: <LogOutButton />
  };

  public onCreateSession() {
    this.props.navigation.navigate("CreateSession");
  }

  public render() {
    return (
      <ScrollView>
        <ScreenHeader>Start a session</ScreenHeader>
        <SearchBar />
        <Button
          containerStyle={styles.createSessionButton}
          iconName="add"
          title="Create new session"
          onPress={() => this.onCreateSession()}
        />
        {sessions.map(session => (
          <SessionCard
            key={session.id}
            onPress={() => this.navigateToSession(session)}
            {...session}
          />
        ))}
      </ScrollView>
    );
  }

  private navigateToSession(session) {
    this.props.navigation.navigate("Session", {
      sessionId: session.id,
      sessionTitle: session.title
    });
  }
}

const styles = StyleSheet.create({
  createSessionButton: {
    marginTop: 20
  }
});

export default Sessions;
