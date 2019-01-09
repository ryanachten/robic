import * as React from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Card, FormLabel, Text } from "react-native-elements";
import { Button, FormInput, IconButton } from "../../components";

export class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  public handleFieldUpdate(fieldName, value) {
    const state = {};
    state[fieldName] = value;
    this.setState(state);
  }

  public onSubmit() {
    const { title } = this.state;
    if (!title) return;
    const submitSessionForm = this.props.submitSessionForm;
    return submitSessionForm(title);
  }

  public render() {
    const { title, unit } = this.state;
    const { containerStyle, onFormClose } = this.props;
    return (
      <Card containerStyle={[styles.formContainer, containerStyle]}>
        <Text style={styles.formHeader}>Create Session</Text>
        <FormInput
          label="Session Title"
          containerStyle={styles.input}
          onChangeText={text => this.handleFieldUpdate("title", text)}
          placeholder="Title"
          value={title}
        />
        <View style={styles.buttonWrapper}>
          <IconButton color="red" name="close" onPress={onFormClose} />
          <IconButton color="green" name="done" onPress={this.onSubmit} />
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
  },
  input: {
    marginTop: 15
  }
});
