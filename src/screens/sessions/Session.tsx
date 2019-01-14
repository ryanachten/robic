import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { ScrollView } from "react-native";
import { ExerciseCard, ScreenHeader } from "../../components";
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

  public componentWillMount() {
    const currentId = this.props.navigation.getParam("sessionId");
  }

  // public renderExercise(exercise) {
  //   const data = mockExercises.filter(
  //     _exercise => _exercise.id === exercise.id
  //   )[0];
  //   if (!data) return null;
  //   return (
  //     <ExerciseCard
  //       key={data.id}
  //       title={data.title}
  //       onPress={() => this.navigateToExercise(data)}
  //     />
  //   );
  // }

  public render() {
    const { title, exercises } = this.state;
    console.log("session", this.props.data.session);
    return (
      <ScrollView>
        <ScreenHeader>{title}</ScreenHeader>
        {/* {exercises.map(currentExercise => this.renderExercise(currentExercise))} */}
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
      exercises {
        definition {
          id
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
