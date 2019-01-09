import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  Button,
  ExerciseFilter,
  ExerciseForm,
  IconButton,
  LogOutButton,
  ScreenHeader,
  SearchBar,
  SessionCard,
  SessionForm
} from "../../components";
import sessions from "../../mock_data/sessions";

class Sessions extends React.Component {
  public static navigationOptions = {
    title: "Sessions",
    headerRight: <LogOutButton />
  };

  public state = {
    showFilterForm: false,
    showCreateSessionForm: false
  };

  public toggleCreateSessionForm() {
    this.setState(prevState => ({
      showCreateSessionForm: !prevState.showCreateSessionForm
    }));
  }

  public toggleFilterForm() {
    this.setState(prevState => ({
      showFilterForm: !prevState.showFilterForm
    }));
  }

  public renderSessionForm() {
    return (
      <SessionForm
        containerStyle={styles.createSessionForm}
        onFormClose={() => this.toggleCreateSessionForm()}
        submitSessionForm={title => this.submitSession(title)}
      />
    );
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
          onPress={() => this.toggleCreateSessionForm()}
        />
      </View>
    );
  }

  public renderSessions() {
    const { sessionDefinitions, loading } = this.props.data;
    if (loading) return;
    console.log("sessionDefinitions", sessionDefinitions);
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

  public async submitSession(title) {
    const sessionResponse = await this.props.mutate({
      variables: {
        title
      }
      // Refresh the exercise definition data in cache after mutation
      // refetchQueries: [{ query: exerciseDefinitionsQuery }]
    });
    this.toggleCreateSessionForm();
  }

  public render() {
    const { showCreateSessionForm, showSearchBar, showFilterForm } = this.state;
    const showButtons =
      !showCreateSessionForm && !showSearchBar && !showFilterForm;

    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          {showCreateSessionForm && this.renderSessionForm()}
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
  createSessionForm: {
    marginLeft: 15,
    marginRight: 15
  },
  headerContainer: {
    marginTop: 20
  }
});

const mutation = gql`
  mutation AddSessionDefinition($title: String!) {
    addSessionDefinition(title: $title) {
      id
    }
  }
`;

const query = gql`
  {
    sessionDefinitions {
      id
      title
      history {
        date
        exercises {
          id
        }
      }
    }
  }
`;

export default compose(
  graphql(mutation),
  graphql(query)
)(Sessions);
