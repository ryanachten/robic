import { SecureStore } from "expo";
import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { Button, FormInput, SearchBar } from "../../components";

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

    return (
      <Card containerStyle={styles.formContainer}>
        <FormInput
          autoCorrect={false}
          label="Title"
          onChangeText={text => this.handleFieldUpdate("title", text)}
          placeholder="Session title"
          value={title}
        />
        <SearchBar />
        <View style={styles.buttonWrapper}>
          <Button
            iconName="done"
            title="Submit"
            onPress={() => this.submitSession()}
          />
          <Button
            iconName="clear"
            title="Clear"
            onPress={() => this.clearFields()}
          />
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
  }
});

const mutation = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

const query = gql`
  {
    currentUser {
      id
      email
      firstName
      lastName
    }
  }
`;

export default compose(
  graphql(mutation),
  graphql(query)
)(CreateSession);
