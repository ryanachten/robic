import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import { Button, ScreenHeader, SetControls, Stopwatch } from "../../components";

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
    timerRunning: false
  };

  public componentDidUpdate(prevProps, prevState) {
    const { flippedCard } = this.state;
    const { exercise, loading } = this.props.data;
    // If done loading, and haven't previously loaded data
    if (prevState.loading && !loading) {
      const { definition, sets } = exercise;
      const { unit } = definition;
      this.setState({
        loading: false,
        unit,
        sets
      });
    }
  }

  public handleValueChange({ index, field, newValue }) {
    const sets = this.state.sets;
    // Increment by 1 for reps and 2.5 for weights
    const incrementValue = field === "reps" ? 1 : 2.5;
    switch (newValue) {
      case "increment": {
        const value = parseFloat(sets[index][field]) + incrementValue;
        sets[index][field] = value.toString();
        break;
      }
      case "decrement": {
        const value = parseFloat(sets[index][field]) - incrementValue;
        sets[index][field] = value.toString();
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
    // If no sets have been assigned, create empty set
    //  TODO: init set should be based on definition history
    if (sets.length === 0) {
      return this.setState({
        sets: [
          {
            unit,
            reps: "0",
            value: "0"
          }
        ]
      });
    }
    sets.push({
      ...sets[sets.length - 1]
    });
    this.setState({
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
    const { timerRunning } = this.state;
    if (timerRunning) {
      this.stopwatch.stop();
      return this.setState({
        timerRunning: false
      });
    }
    this.stopwatch.start();
    return this.setState({
      timerRunning: true
    });
  }

  public renderTimerButton() {
    const timerRunning = this.state.timerRunning;
    return (
      <Button
        buttonStyle={{ backgroundColor: timerRunning ? "red" : "green" }}
        containerStyle={{
          marginTop: 20
        }}
        iconName={timerRunning ? "timer-off" : "timer"}
        onPress={() => this.toggleTimer()}
        title={timerRunning ? "Stop" : "Start"}
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
      sets
    } = this.state;
    if (loading) return <ActivityIndicator size="small" />;
    return (
      <ScrollView>
        <ScreenHeader>Sets</ScreenHeader>
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
              reps={reps}
              setNumber={index}
              unit={unit}
              value={value}
            />
          );
        })}
        <Button
          containerStyle={{
            marginTop: 20
          }}
          iconName="add"
          onPress={() => this.handleAddSet()}
          title="Add new set"
        />
        {this.renderTimerButton()}
      </ScrollView>
    );
  }
}

const mutation = gql`
  mutation AddSession($definitionId: ID!) {
    addSession(definitionId: $definitionId) {
      id
    }
  }
`;

const query = gql`
  query GetExercise($exerciseId: ID!) {
    exercise(id: $exerciseId) {
      id
      definition {
        title
        unit
        history {
          id
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
