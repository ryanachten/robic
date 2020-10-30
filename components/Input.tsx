import React from "react";
import { StyleSheet } from "react-native";
import { Input as RnInput, InputProps } from "react-native-elements";
import Colors from "../constants/Colors";

export const Input = (props: InputProps) => (
  <RnInput
    {...props}
    labelStyle={[styles.inputLabel, props.labelStyle]}
    inputStyle={[styles.input, styles.input]}
  />
);

const styles = StyleSheet.create({
  input: {
    color: Colors.light.text,
  },
  inputLabel: {
    color: Colors.light.text,
    fontWeight: "normal",
  },
});
