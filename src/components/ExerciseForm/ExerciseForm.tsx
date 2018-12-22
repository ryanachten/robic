import * as React from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Card, FormInput, Text } from "react-native-elements";
import { Button, IconButton } from "../../components";

export class ExerciseForm extends React.Component {
  public state = {
    title: ""
  };

  public handleFieldUpdate(fieldName, value) {
    const state = {};
    state[fieldName] = value;
    this.setState(state);
  }

  public render() {
    const { title } = this.state;
    const { containerStyle, onFormClose } = this.props;
    return (
      <Card containerStyle={{ margin: 20, flex: 1 }}>
        <FormInput
          //containerStyle={{ width: "50%" }}
          //onChangeText={text => onRepValueChange(text)}
          placeholder="Title"
          value={title}
        />
        <IconButton color="red" name="close" onPress={onFormClose} />
      </Card>
    );
  }
}

// const styles = StyleSheet.create({
//   input: {
//     flex: 1
//   },
//   section: {
//     alignItems: "center",
//     flex: 1,
//     flexDirection: "row"
//   }
// });
