import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { Button, FormInput } from "../../components";

class Login extends React.Component {
  public static navigationOptions = {
    title: "Login"
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }

  public handleFieldUpdate(fieldName, value) {
    const state = {};
    state[fieldName] = value;
    this.setState(state);
  }

  public submitLogin() {
    const { firstName, lastName } = this.state;
    console.log(firstName, lastName);
  }

  public clearFields() {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
  }

  public render() {
    const { firstName, lastName, email, password } = this.state;

    return (
      <Card containerStyle={styles.formContainer}>
        <FormInput
          autoCorrect={false}
          onChangeText={text => this.handleFieldUpdate("firstName", text)}
          label="First Name"
          placeholder="First Name"
          value={firstName}
        />
        <FormInput
          autoCorrect={false}
          label="Last Name"
          onChangeText={text => this.handleFieldUpdate("lastName", text)}
          placeholder="Last Name"
          value={lastName}
        />
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
  formHeader: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  }
});

export default Login;
