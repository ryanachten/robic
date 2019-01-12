import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, FormLabel, Text } from "react-native-elements";
import { ExerciseList, FormInput, IconButton } from "../../components";
import {
  exerciseDefinitionsQuery,
  sessionDefinitionsQuery
} from "../../queries";

class CreateSession extends React.Component {
  public static navigationOptions = {
    title: "Create Session"
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      availableExercises: [],
      exercises: []
    };
  }

  public componentDidUpdate() {
    const { availableExercises, exercises } = this.state;
    const exerciseDefinitions = this.props.data.exerciseDefinitions;
    if (!exerciseDefinitions) return;
    // Only update exercises from query on initial query load
    if (
      exerciseDefinitions.length > 0 &&
      availableExercises.length === 0 &&
      exercises.length === 0
    ) {
      this.setState({
        availableExercises: exerciseDefinitions
      });
    }
  }

  public async submitSession() {
    const { title, exercises } = this.state;
    // TODO: add proper form feedback
    if (!title || exercises.length === 0) return;

    const exerciseIds = exercises.map(exercise => exercise.id);

    // Executes the login mutation with the following query parameters
    const sessionResponse = await this.props.mutate({
      variables: {
        title,
        exercises: exerciseIds
      },
      // Refresh the exercise definition data in cache after mutation
      refetchQueries: [{ query: sessionDefinitionsQuery }]
    });
    this.props.navigation.navigate("Sessions");
  }

  public updateSessionName(title) {
    this.setState({
      title
    });
  }

  public clearFields() {
    this.setState({
      title: "",
      exercises: []
    });
  }

  public addExerciseToSessionList(exercise) {
    const { availableExercises, exercises, title } = this.state;

    // Remove selected exercise from available exercises
    const newAvailableExercises = availableExercises.filter(
      availableExercise => availableExercise.id !== exercise.id
    );

    // Update exercises w/ new item
    this.setState(prevState => ({
      exercises: [...prevState.exercises, exercise],
      availableExercises: newAvailableExercises
    }));
  }

  public render() {
    const { title, exercises, availableExercises } = this.state;
    const { loading } = this.props.data;

    return (
      <ScrollView>
        <Card containerStyle={styles.formContainer}>
          <FormInput
            autoCapitalize="words"
            label="Session Name"
            containerStyle={styles.input}
            onChangeText={text => this.updateSessionName(text)}
            placeholder="Name"
            value={title}
          />
          <FormLabel>Session Exercises</FormLabel>
          <ExerciseList exerciseDefinitions={exercises} loading={loading} />
          <FormLabel>Available Exercises</FormLabel>
          <ExerciseList
            exerciseDefinitions={availableExercises}
            loading={loading}
            onExercisePress={exercise =>
              this.addExerciseToSessionList(exercise)
            }
          />
          <View style={styles.buttonWrapper}>
            <IconButton
              color="red"
              name="close"
              onPress={() => this.clearFields()}
            />
            <IconButton
              color="green"
              name="done"
              onPress={() => this.submitSession()}
            />
          </View>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20
  },
  formContainer: {
    flex: 1
  },
  input: {
    marginTop: 15
  }
});

const mutation = gql`
  mutation AddSessionDefinition($title: String!, $exercises: [ID!]) {
    addSessionDefinition(title: $title, exercises: $exercises) {
      id
    }
  }
`;

export default compose(
  graphql(mutation),
  graphql(exerciseDefinitionsQuery)
)(CreateSession);
