import * as React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  Button,
  ExerciseFilter,
  ExerciseForm,
  IconButton,
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

  public state = {
    showFilterForm: false
  };

  public toggleFilterForm() {
    this.setState(prevState => ({
      showFilterForm: !prevState.showFilterForm
    }));
  }

  public renderFilterForm() {
    return (
      <ExerciseFilter
        onFormClose={() => this.toggleFilterForm()}
        submitExerciseFilter={({ searchTerm, sortBy }) =>
          console.log("submitExerciseFilter", searchTerm, sortBy)
        }
      />
    );
  }

  public renderButtons() {
    return (
      <View style={styles.buttonContainer}>
        <IconButton
          color="black"
          name="search"
          onPress={() => this.toggleFilterForm()}
        />
        <IconButton
          color="green"
          name="add"
          onPress={() => this.onCreateSession()}
        />
      </View>
    );
  }

  public renderSessions() {
    return (
      <View>
        {sessions.map(session => (
          <SessionCard
            key={session.id}
            onPress={() => this.navigateToSession(session)}
            {...session}
          />
        ))}
      </View>
    );
  }

  public onCreateSession() {
    this.props.navigation.navigate("CreateSession");
  }

  public render() {
    const { showSearchBar, showFilterForm } = this.state;
    const showButtons = !showSearchBar && !showFilterForm;

    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          {showSearchBar && this.renderSearchBar()}
          {showFilterForm && this.renderFilterForm()}
          {showButtons && this.renderButtons()}
        </View>
        {this.renderSessions()}
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
  buttonContainer: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  },
  cancelButton: {
    marginTop: 20
  },
  headerContainer: {
    marginTop: 20
  }
});

export default Sessions;
