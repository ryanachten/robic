import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import { ExerciseList, ScreenHeader } from "../../components";
import mockExercises from "../../mock_data/exercises";
import sessions from "../../mock_data/sessions";

class Session extends React.Component {
  public static navigationOptions = ({ navigation }) => {
    const sessionTitle = navigation.state.params.sessionTitle;
    return {
      title: sessionTitle ? sessionTitle : "Session"
    };
  };

  public state = {
    exercises: null,
    title: ""
  };

  public render() {
    const { loading, session } = this.props.data;
    // Transform exercise to comply w/ ExerciseList API
    const exercises =
      session &&
      session.exercises.map(exercise => {
        return {
          id: exercise.id,
          title: exercise.definition.title,
          history: exercise.definition.history
        };
      });
    return (
      <ScrollView>
        <ExerciseList
          exerciseDefinitions={exercises}
          loading={loading}
          onExercisePress={exercise => this.navigateToExercise(exercise)}
        />
      </ScrollView>
    );
  }

  private navigateToExercise(exercise) {
    this.props.navigation.navigate("SessionExercise", {
      exerciseId: exercise.id,
      exerciseTitle: exercise.title
    });
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
  query GetExercises($sessionId: ID!) {
    session(id: $sessionId) {
      id
      exercises {
        id
        definition {
          id
          title
          history {
            id
            session {
              date
            }
          }
        }
      }
    }
  }
`;

const styles = StyleSheet.create({});

export default compose(
  graphql(mutation),
  graphql(query, {
    options: props => ({
      variables: { sessionId: props.navigation.state.params.sessionId }
    })
  })
)(Session);
