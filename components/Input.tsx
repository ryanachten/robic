import React from "react";
import { StyleSheet } from "react-native";
import { Input as RnInput, InputProps } from "react-native-elements";
import { Colors } from "../constants/Colors";

export const Input = (props: InputProps) => (
  <RnInput
    {...props}
    labelStyle={[styles.inputLabel, props.labelStyle]}
    inputStyle={[styles.input, styles.input]}
    renderErrorMessage={false}
  />
);

const styles = StyleSheet.create({
  input: {
    color: Colors.black,
  },
  inputLabel: {
    color: Colors.black,
    fontWeight: "normal",
  },
});
