import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Button, SetControls, Stopwatch } from "../../components";

class Exercise extends React.Component {
  public static navigationOptions = ({ navigation }) => {
    const exerciseTitle = navigation.state.params.exerciseTitle;
    return {
      title: exerciseTitle ? exerciseTitle : "Exercise"
    };
  };

  public state = {
    loading: true,
    unit: "",
    sets: [],
    expandedCard: 0,
    flippedCard: null,
    startTime: null,
    clock: null,
    timerStarted: false,
    timerRunning: false
  };

  public componentDidUpdate(prevProps, prevState) {
    const { flippedCard } = this.state;
    const { exercise, loading } = this.props.data;
    // If done loading, and haven't previously loaded data
    if (prevState.loading && !loading) {
      const { definition, sets } = exercise;
      const { unit } = definition;
      //  TODO: init set should be based on definition history
      // If no sets have been assigned, create empty set
      if (sets.length === 0) {
        sets.push({
          reps: 0,
          value: 0
        });
      }
      this.setState({
        loading: false,
        // Remove type definition prop query payload
        sets: sets.map(set => ({ value: set.value, reps: set.reps })),
        unit
      });
    }
  }

  public handleValueChange({ index, field, newValue }) {
    const sets = this.state.sets;
    // Increment by 1 for reps and 2.5 for weights
    const incrementValue = field === "reps" ? 1 : 2.5;
    switch (newValue) {
      case "increment": {
        sets[index][field] = sets[index][field] + incrementValue;
        break;
      }
      case "decrement": {
        let value = sets[index][field] - incrementValue;
        if (value < 0) value = 0;
        sets[index][field] = value;
        break;
      }
      default: {
        // Prevent non-numeric values being added via text field
        if (!isNaN(newValue)) {
          sets[index][field] = newValue;
        }
        break;
      }
    }
    this.setState({
      sets
    });
  }

  public handleAddSet() {
    const { sets, unit } = this.state;
    sets.push({
      ...sets[sets.length - 1]
    });
    this.setState({
      expandedCard: sets.length - 1,
      sets
    });
  }

  public handleDeleteSet(index) {
    const sets = this.state.sets;
    sets.splice(index, 1);
    this.setState({
      flippedCard: null,
      sets
    });
  }

  public handleExpandedCard(index) {
    this.setState({
      expandedCard: index
    });
  }

  public handleFlipCard(index) {
    // Prevent removing card when there is ony one set left
    if (this.state.sets.length === 1) return;
    this.setState({
      flippedCard: index
    });
  }

  public cancelFlipCard() {
    this.setState({
      flippedCard: null
    });
  }

  public toggleTimer() {
    const { timerRunning, timerStarted } = this.state;
    if (timerRunning) {
      this.stopwatch.stop();
      return this.setState({
        timerRunning: false
      });
    }
    const state = {
      timerRunning: true
    };
    if (!timerStarted) state.timerStarted = true;
    this.stopwatch.start();
    return this.setState(state);
  }

  public restartTimer() {
    this.stopwatch.reset();
    this.setState({
      timerRunning: false,
      timerStarted: false
    });
  }

  public async submitExercise() {
    const { sets } = this.state;
    const { exercise } = this.props.data;
    const time = this.stopwatch.getTime();
    const finishTime = new Date(
      null, // year
      null, // month
      null, // day
      null, // hour
      time[0], // min
      time[1], // sec
      time[2] // millisec
    );
    const baseDate = new Date(null, null, null, null, null, null, null);
    // Returns total time in millisconds
    const timeTaken = finishTime - baseDate;
    this.stopwatch.stop();
    this.setState({
      timerRunning: false
    });

    const exerciseResponse = await this.props.mutate({
      variables: {
        exerciseId: exercise.id,
        sets,
        timeTaken
      },
      // Refresh the exercise definition data in cache after mutation
      refetchQueries: [
        {
          query,
          variables: {
            exerciseId: exercise.id
          }
        }
      ]
    });
    const session = this.props.data.exercise.session;
    this.props.navigation.navigate("Session", {
      sessionId: session.id,
      sessionTitle: session.definition.title
    });
  }

  public renderTimerButton() {
    const { timerRunning, timerStarted, sets } = this.state;
    // Disallow timer if value or set hasn't been added
    if (sets[0].value === 0 || sets[0].reps === 0) {
      return null;
    }
    const label = () => {
      if (!timerRunning && timerStarted) {
        return "Continue";
      }
      if (timerRunning) {
        return "Pause";
      }
      return "Start";
    };
    const color = () => {
      if (!timerRunning && timerStarted) {
        return "white";
      }
      if (timerRunning) {
        return "orange";
      }
      return "green";
    };
    return (
      <View style={styles.timerButtonWrapper}>
        <Button
          buttonStyle={{ backgroundColor: color() }}
          containerStyle={styles.timerButton}
          iconName={timerRunning ? "pause" : "play-arrow"}
          onPress={() => this.toggleTimer()}
          title={label()}
        />
        {timerStarted && !timerRunning && (
          <Button
            containerStyle={styles.timerButton}
            iconName="replay"
            onPress={() => this.restartTimer()}
            title="Restart"
          />
        )}
      </View>
    );
  }

  public renderSubmitButton() {
    const { sets, timerStarted } = this.state;
    // Disallow submit if timer hasn't started
    if (!timerStarted) return null;
    // Disallow submit if value or set hasn't been added
    if (sets[0].value === 0 || sets[0].reps === 0) return null;
    return (
      <Button
        buttonStyle={{ backgroundColor: "green" }}
        containerStyle={styles.button}
        onPress={() => this.submitExercise()}
        title="Complete exercise"
      />
    );
  }

  public render() {
    const {
      exercise,
      expandedCard,
      flippedCard,
      loading,
      unit,
      sets,
      timerRunning,
      timerStarted
    } = this.state;

    if (loading) return <ActivityIndicator size="small" />;

    const showAddSetButton = sets[0].value !== 0 && sets[0].reps !== 0;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Stopwatch
          ref={stopwatch => {
            this.stopwatch = stopwatch;
          }}
        />
        {sets.map(({ reps, value }, index) => {
          return (
            <SetControls
              expanded={expandedCard === index}
              expandCard={() => this.handleExpandedCard(index)}
              flipCard={() => this.handleFlipCard(index)}
              flipped={flippedCard === index}
              key={index}
              onCancel={() => this.cancelFlipCard()}
              onDelete={() => this.handleDeleteSet(index)}
              onUnitValueChange={newValue =>
                this.handleValueChange({
                  field: "value",
                  index,
                  newValue
                })
              }
              onRepValueChange={newValue =>
                this.handleValueChange({
                  field: "reps",
                  index,
                  newValue
                })
              }
              reps={reps.toString()}
              setNumber={index}
              unit={unit}
              value={value.toString()}
            />
          );
        })}
        {showAddSetButton && (
          <Button
            containerStyle={styles.button}
            iconName="add"
            onPress={() => this.handleAddSet()}
            title="Add new set"
          />
        )}
        {this.renderTimerButton()}
        {this.renderSubmitButton()}
        <Button
          buttonStyle={{ backgroundColor: "red" }}
          containerStyle={styles.button}
          onPress={() => console.log("discard")}
          title="Discard exercise"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20
  },
  container: {
    paddingTop: 20
  },
  timerButton: {
    flexGrow: 1
  },
  timerButtonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  }
});

const mutation = gql`
  mutation UpdateExercise(
    $exerciseId: ID!
    $sets: [SetInput]!
    $timeTaken: Int!
  ) {
    updateExercise(
      exerciseId: $exerciseId
      sets: $sets
      timeTaken: $timeTaken
    ) {
      id
    }
  }
`;

const query = gql`
  query GetExercise($exerciseId: ID!) {
    exercise(id: $exerciseId) {
      id
      definition {
        id
        title
        unit
        history {
          id
        }
      }
      session {
        id
        definition {
          id
          title
        }
      }
      sets {
        reps
        value
      }
    }
  }
`;

export default compose(
  graphql(mutation),
  graphql(query, {
    options: props => ({
      variables: { exerciseId: props.navigation.state.params.exerciseId }
    })
  })
)(Exercise);
