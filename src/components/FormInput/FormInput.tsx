import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  Card,
  FormInput as RNEFormInput,
  FormLabel,
  Text
} from "react-native-elements";
import { Button } from "../components";

export class FormInput extends React.Component {
  public render() {
    const {
      autoCapitalize = "none",
      autoCorrect = false,
      label,
      onChangeText,
      placeholder,
      secureTextEntry,
      value
    } = this.props;
    return (
      <React.Fragment>
        <FormLabel>{label}</FormLabel>
        <RNEFormInput
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          containerStyle={styles.input}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
        />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginTop: 15
  }
});
