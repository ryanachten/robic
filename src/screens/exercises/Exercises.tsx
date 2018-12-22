import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import {
  Button,
  ExerciseCard,
  ExerciseFilter,
  ExerciseForm,
  IconButton,
  ScreenHeader,
  SearchBar,
  SessionCard
} from "../../components";

class Exercises extends React.Component {
  public static navigationOptions = {
    title: "Exercises"
  };

  public state = {
    showCreateExerciseForm: false,
    showFilterForm: true,
    exercises: [
      {
        id: "benchpress",
        title: "Benchpress",
        date: "Yesterday",
        lastWeightChange: { delta: 10, sign: "positive", unit: "kg" },
        personalBest: { reps: 1, value: 95, unit: "kg" }
      },
      {
        id: "deadlift",
        title: "Deadlift",
        date: "10 days ago",
        lastWeightChange: { sign: "noChange" },
        personalBest: { reps: 1, value: 95, unit: "kg" }
      },
      {
        id: "plank",
        title: "Plank",
        date: "3 months ago",
        lastWeightChange: { delta: 10.5, sign: "negative", unit: "sec" },
        personalBest: { value: 60, unit: "sec" }
      }
    ]
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

  public renderExerciseForm() {
    return (
      <ExerciseForm
        containerStyle={styles.createExerciseForm}
        onFormClose={() => this.toggleCreateExerciseForm()}
        submitExerciseForm={(title, unit) =>
          console.log("submitExerciseForm", title, unit)
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
      exercises,
      showCreateExerciseForm,
      showSearchBar,
      showFilterForm
    } = this.state;
    const showButtons =
      !showCreateExerciseForm && !showSearchBar && !showFilterForm;
    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          {showCreateExerciseForm && this.renderExerciseForm()}
          {showSearchBar && this.renderSearchBar()}
          {showFilterForm && this.renderFilterForm()}
          {showButtons && this.renderButtons()}
        </View>
        {exercises.map(
          ({ id, title, date, lastWeightChange, personalBest }) => (
            <ExerciseCard
              key={title}
              lastActive={date}
              personalBest={personalBest}
              lastWeightChange={lastWeightChange}
              onPress={() => this.navigateToExercise(id, title)}
              title={title}
            />
          )
        )}
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

export default Exercises;

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
  }
});
