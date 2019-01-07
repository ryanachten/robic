import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import {
  Button,
  ExerciseFilter,
  ExerciseForm,
  ExerciseList,
  IconButton,
  ScreenHeader,
  SearchBar,
  SessionCard
} from "../../components";
import { exerciseDefinitionsQuery } from "../../queries";

class Exercises extends React.Component {
  public static navigationOptions = {
    title: "Exercises"
  };

  /*
  {
    id: "benchpress",
    title: "Benchpress",
    date: "Yesterday",
    lastWeightChange: { delta: 10, sign: "positive", unit: "kg" },
    personalBest: { reps: 1, value: 95, unit: "kg" }
  },
  */

  public state = {
    showCreateExerciseForm: false,
    showFilterForm: false
  };

  public toggleCreateExerciseForm() {
    this.setState(prevState => ({
      showCreateExerciseForm: !prevState.showCreateExerciseForm
    }));
  }

  public toggleFilterForm() {
    this.setState(prevState => ({
      showFilterForm: !prevState.showFilterForm
    }));
  }

  public async submitExerciseDefinition(title, unit) {
    const exerciseResponse = await this.props.mutate({
      variables: {
        title,
        unit
      },
      // Refresh the exercise definition data in cache after mutation
      refetchQueries: [{ query: exerciseDefinitionsQuery }]
    });
    this.setState({
      showCreateExerciseForm: false
    });
    // TODO: add error handling to form submission
  }

  public renderExerciseForm() {
    return (
      <ExerciseForm
        containerStyle={styles.createExerciseForm}
        onFormClose={() => this.toggleCreateExerciseForm()}
        submitExerciseForm={(title, unit) =>
          this.submitExerciseDefinition(title, unit)
        }
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
          onPress={() => this.toggleCreateExerciseForm()}
        />
      </View>
    );
  }

  public render() {
    const {
      showCreateExerciseForm,
      showSearchBar,
      showFilterForm
    } = this.state;
    const showButtons =
      !showCreateExerciseForm && !showSearchBar && !showFilterForm;
    const { exerciseDefinitions, loading } = this.props.data;

    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          {showCreateExerciseForm && this.renderExerciseForm()}
          {showSearchBar && this.renderSearchBar()}
          {showFilterForm && this.renderFilterForm()}
          {showButtons && this.renderButtons()}
        </View>
        <ExerciseList
          exerciseDefinitions={exerciseDefinitions}
          loading={loading}
          onExercisePress={(id, title) => this.navigateToExercise(id, title)}
        />
      </ScrollView>
    );
  }

  private navigateToExercise(id, title) {
    this.props.navigation.navigate("ExerciseRecord", {
      exerciseId: id,
      exerciseTitle: title
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
  createExerciseForm: {
    marginLeft: 15,
    marginRight: 15
  },
  headerContainer: {
    marginTop: 20
  },
  noExercisesContainer: {
    margin: 20
  },
  noExercisesMessage: {
    textAlign: "center"
  }
});

const mutation = gql`
  mutation AddExerciseDefinition($title: String!, $unit: String!) {
    addExerciseDefinition(title: $title, unit: $unit) {
      id
    }
  }
`;

export default compose(
  graphql(mutation),
  graphql(exerciseDefinitionsQuery)
)(Exercises);
