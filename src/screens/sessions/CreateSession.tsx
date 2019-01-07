import { SecureStore } from "expo";
import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
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

  public render() {
    const { title, exercises } = this.state;
    const { exerciseDefinitions, loading } = this.props.data;

    return (
      <Card containerStyle={styles.formContainer}>
        <FormInput
          label="Name"
          containerStyle={styles.input}
          //onChangeText={text => this.handleFieldUpdate("title", text)}
          placeholder="Name"
          //value={title}
        />
        <ExerciseList
          exerciseDefinitions={exerciseDefinitions}
          loading={loading}
          onExercisePress={(id, title) => console.log(id, title)}
        />
        <View style={styles.buttonWrapper}>
          <IconButton color="red" name="close" /*onPress={onFormClose}*/ />
          <IconButton color="green" name="done" /*onPress={this.onSubmit}*/ />
        </View>
      </Card>
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
