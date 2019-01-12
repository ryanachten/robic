import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "react-apollo";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  Button,
  ExerciseFilter,
  ExerciseForm,
  IconButton,
  LogOutButton,
  ScreenHeader,
  SearchBar,
  SessionList
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

  public onCreateSession() {
    this.props.navigation.navigate("CreateSession");
  }

  public render() {
    const { showSearchBar, showFilterForm } = this.state;
    const showButtons = !showSearchBar && !showFilterForm;

    const { loading, sessionDefinitions } = this.props.data;

    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          {showSearchBar && this.renderSearchBar()}
          {showFilterForm && this.renderFilterForm()}
          {showButtons && this.renderButtons()}
        </View>
        <SessionList
          loading={loading}
          sessionDefinitions={sessionDefinitions}
          onSessionPress={session => console.log("session", session)}
        />
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

const query = gql`
  {
    sessionDefinitions {
      id
      title
      exercises {
        title
      }
      history {
        date
      }
    }
  }
`;

export default graphql(query)(Sessions);
