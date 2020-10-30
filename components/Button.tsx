import React from "react";
import { StyleSheet } from "react-native";
import { Button as RnButton, ButtonProps } from "react-native-elements";
import Colors from "../constants/Colors";

export const Button = (props: ButtonProps) => (
  <RnButton
    {...props}
    raised={true}
    buttonStyle={[styles.button, props.buttonStyle]}
    titleStyle={[styles.title, props.titleStyle]}
  />
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.background,
  },
  title: {
    color: Colors.light.text,
  },
});
