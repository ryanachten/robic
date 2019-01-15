import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { ActivityIndicator, ScrollView } from "react-native";
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
    const exercises = session ? session.definition.exercises : [];
    return (
      <ScrollView>
        <ExerciseList exerciseDefinitions={exercises} loading={loading} />
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
  query GetSession($sessionId: ID!) {
    session(id: $sessionId) {
      id
      definition {
        title
        exercises {
          id
          title
          history {
            session {
              date
            }
          }
          unit
        }
      }
    }
  }
`;

export default compose(
  graphql(mutation),
  graphql(query, {
    options: props => ({
      variables: { sessionId: props.navigation.state.params.sessionId }
    })
  })
)(Session);
