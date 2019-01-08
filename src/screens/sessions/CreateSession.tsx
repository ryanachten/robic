import { SecureStore } from "expo";
import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, FormLabel, Text } from "react-native-elements";
import { ExerciseList, FormInput, IconButton } from "../../components";
import { exerciseDefinitionsQuery } from "../../queries";

class CreateSession extends React.Component {
  public static navigationOptions = {
    title: "Create Session"
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      exercises: []
    };
  }

  public handleFieldUpdate(fieldName, value) {
    const state = {};
    state[fieldName] = value;
    this.setState(state);
  }

  public async submitSession() {
    const { title, exercises } = this.state;

    // // Executes the login mutation with the following query parameters
    // const loginResponse = await this.props.mutate({
    //   variables: {
    //     email,
    //     password
    //   }
    // });
    // const token = loginResponse.data.loginUser;
    // if (token) {
    //   await SecureStore.setItemAsync("token", token);
    //   this.clearFields();
    //   this.props.navigation.navigate("Activity");
    // }
  }

  public clearFields() {
    this.setState({
      title: "",
      exercises: []
    });
  }

  public addExerciseToSessionList(exercise) {
    const exercises = this.state.exercises;
    // Prevent duplicate exercises being added to the active list
    // TODO: should probably store exerciseDefs in state and remove from available
    const alreadyExists = exercises.filter(
      existingExercise => existingExercise.id === exercise.id
    );
    if (alreadyExists.length > 0) return;
    this.setState(prevState => ({
      exercises: [...prevState.exercises, exercise]
    }));
  }

  public render() {
    const { title, exercises } = this.state;
    const { exerciseDefinitions, loading } = this.props.data;

    return (
      <ScrollView>
        <Card containerStyle={styles.formContainer}>
          <FormInput
            label="Session Name"
            containerStyle={styles.input}
            //onChangeText={text => this.handleFieldUpdate("title", text)}
            placeholder="Name"
            //value={title}
          />
          <FormLabel>Session Exercises</FormLabel>
          <ExerciseList exerciseDefinitions={exercises} loading={loading} />
          <FormLabel>Available Exercises</FormLabel>
          <ExerciseList
            exerciseDefinitions={exerciseDefinitions}
            loading={loading}
            onExercisePress={exercise =>
              this.addExerciseToSessionList(exercise)
            }
          />
          <View style={styles.buttonWrapper}>
            <IconButton color="red" name="close" /*onPress={onFormClose}*/ />
            <IconButton color="green" name="done" /*onPress={this.onSubmit}*/ />
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
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

export default compose(
  graphql(mutation),
  graphql(exerciseDefinitionsQuery)
)(CreateSession);
