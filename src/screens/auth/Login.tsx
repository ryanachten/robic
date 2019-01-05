import { SecureStore } from "expo";
import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { Button, FormInput } from "../../components";

class Login extends React.Component {
  public static navigationOptions = {
    title: "Login",
    headerLeft: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  public handleFieldUpdate(fieldName, value) {
    const state = {};
    state[fieldName] = value;
    this.setState(state);
  }

  public async submitLogin() {
    const { email, password } = this.state;
    if (!email || !password) return;

    // Executes the login mutation with the following query parameters
    const loginResponse = await this.props.mutate({
      variables: {
        email,
        password
      }
    });
    const token = loginResponse.data.loginUser;
    if (token) {
      await SecureStore.setItemAsync("token", token);
      this.clearFields();
      this.props.navigation.navigate("Activity");
    }
  }

  public navigateToRegistration() {
    this.props.navigation.navigate("Register");
  }

  public clearFields() {
    this.setState({
      email: "",
      password: ""
    });
  }

  public render() {
    const { email, password } = this.state;

    return (
      <Card containerStyle={styles.formContainer}>
        <FormInput
          autoCorrect={false}
          label="Email"
          onChangeText={text => this.handleFieldUpdate("email", text)}
          placeholder="example@email.com"
          value={email}
        />
        <FormInput
          autoCorrect={false}
          label="Password"
          onChangeText={text => this.handleFieldUpdate("password", text)}
          placeholder="At least 6 characters"
          secureTextEntry
          value={password}
        />
        <View style={styles.buttonWrapper}>
          <Button
            iconName="done"
            title="Submit"
            onPress={() => this.submitLogin()}
          />
          <Button
            iconName="clear"
            title="Clear"
            onPress={() => this.clearFields()}
          />
        </View>
        <TouchableOpacity onPress={() => this.navigateToRegistration()}>
          <Text style={styles.link}>
            Don't have an account?{"\n"}Click here to register
          </Text>
        </TouchableOpacity>
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
  link: {
    alignSelf: "center",
    textAlign: "center",
    marginTop: 20
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
)(Login);
