import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { ActivityIndicator, ScrollView } from "react-native";
import { Button, ScreenHeader, SetControls } from "../../components";

class Exercise extends React.Component {
  public static navigationOptions = ({ navigation }) => {
    const exerciseTitle = navigation.state.params.exerciseTitle;
    return {
      title: exerciseTitle ? exerciseTitle : "Exercise"
    };
  };

  public state = {
    flippedCard: null
  };

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
    const sets = this.state.sets;
    sets.push(sets[sets.length - 1]);
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

  public render() {
    const { flippedCard } = this.state;
    const { exercise, loading } = this.props.data;
    if (loading) return <ActivityIndicator size="small" />;
    console.log("exercise", exercise);
    const { definition, sets } = exercise;
    const { unit } = definition;
    return (
      <ScrollView>
        <ScreenHeader>Sets</ScreenHeader>
        {sets.map(({ reps, unitValue }, index) => {
          return (
            <SetControls
              flipCard={() => this.handleFlipCard(index)}
              flipped={flippedCard === index}
              key={index}
              onCancel={() => this.cancelFlipCard()}
              onDelete={() => this.handleDeleteSet(index)}
              onUnitValueChange={newValue =>
                this.handleValueChange({
                  field: "unitValue",
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
              value={unitValue}
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
