import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import {
  Button,
  ExerciseCard,
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
    showCreateExerciseForm: true,
    showSearchBar: false,
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

  public toggleSearchBar() {
    this.setState(prevState => ({
      showSearchBar: !prevState.showSearchBar
    }));
  }

  public toggleCreateExerciseForm() {
    this.setState(prevState => ({
      showCreateExerciseForm: !prevState.showCreateExerciseForm
    }));
  }

  public renderSearchBar() {
    return (
      <View style={styles.buttonContainer}>
        <SearchBar placeholder="Find exercise" />
        <IconButton
          color="red"
          name="clear"
          onPress={() => this.toggleSearchBar()}
        />
      </View>
    );
  }

  public renderExerciseForm() {
    return (
      <View>
        <ExerciseForm
          containerStyle={styles.createExerciseForm}
          onFormClose={() => this.toggleCreateExerciseForm()}
        />
      </View>
    );
  }

  public renderButtons() {
    return (
      <View style={styles.buttonContainer}>
        <IconButton
          color="black"
          name="search"
          onPress={() => this.toggleSearchBar()}
        />
        <IconButton
          color="green"
          name="add"
          onPress={() => this.toggleCreateExerciseForm()}
        />
        <IconButton
          color="black"
          name="settings"
          onPress={() => console.log("Show settings")}
        />
      </View>
    );
  }

  public render() {
    const { exercises, showCreateExerciseForm, showSearchBar } = this.state;
    const showButtons = !showCreateExerciseForm && !showSearchBar;
    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          {showCreateExerciseForm && this.renderExerciseForm()}
          {showSearchBar && this.renderSearchBar()}
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
    // alignSelf: "stretch",
    marginLeft: 20,
    marginRight: 20
    // width: "100%"
  },
  headerContainer: {
    marginTop: 20
  }
});
