import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import {
  Button,
  ExerciseCard,
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
    showSearchBar: false,
    exercises: [
      {
        title: "Benchpress",
        date: "Yesterday",
        lastWeightChange: { delta: 10, sign: "positive", unit: "kg" },
        personalBest: { reps: 1, value: 95, unit: "kg" }
      },
      {
        title: "Deadlift",
        date: "10 days ago",
        lastWeightChange: { sign: "noChange" },
        personalBest: { reps: 1, value: 95, unit: "kg" }
      },
      {
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

  public renderButtons() {
    const { showSearchBar } = this.state;
    if (showSearchBar) {
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
          onPress={() => console.log("Add new exercise")}
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
    const exercises = this.state.exercises;
    return (
      <ScrollView>
        <View style={styles.searchContainer}>{this.renderButtons()}</View>
        {exercises.map(({ title, date, lastWeightChange, personalBest }) => (
          <ExerciseCard
            key={title}
            lastActive={date}
            personalBest={personalBest}
            lastWeightChange={lastWeightChange}
            onPress={() => console.log("exerise pressed", title)}
            title={title}
          />
        ))}
      </ScrollView>
    );
  }

  // private navigateToSession(session) {
  //   this.props.navigation.navigate('Session', {
  //     sessionId: session.id,
  //     sessionTitle: session.title,
  //   });
  // }
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
  searchContainer: {
    alignSelf: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 20,
    width: "100%"
  }
});
