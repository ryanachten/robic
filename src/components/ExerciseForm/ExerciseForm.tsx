import * as React from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Card, FormInput, FormLabel, Text } from "react-native-elements";
import { Button, IconButton } from "../../components";

export class ExerciseForm extends React.Component {
  public state = {
    title: "",
    unit: ""
  };

  public handleFieldUpdate(fieldName, value) {
    const state = {};
    state[fieldName] = value;
    this.setState(state);
  }

  public render() {
    const { title, unit } = this.state;
    const { containerStyle, onFormClose } = this.props;
    return (
      <Card containerStyle={[styles.formContainer, containerStyle]}>
        <Text style={styles.formHeader}>Create Exercise</Text>
        <FormLabel>Name</FormLabel>
        <FormInput
          containerStyle={styles.input}
          onChangeText={text => this.handleFieldUpdate("title", text)}
          placeholder="Name"
          value={title}
        />
        <FormLabel>Unit</FormLabel>
        <FormInput
          autoCapitalize={false}
          containerStyle={styles.input}
          onChangeText={text => this.handleFieldUpdate("unit", text)}
          placeholder="Unit (kg/sec/lb/etc)"
          value={unit}
        />
        <View style={styles.buttonWrapper}>
          <IconButton color="red" name="close" onPress={onFormClose} />
          <IconButton color="green" name="done" onPress={onFormClose} />
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
