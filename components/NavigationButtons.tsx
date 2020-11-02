import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../services/context";
import { Text } from "./Themed";
import { Colors } from "../constants/Colors";
import { Margin } from "../constants/Sizes";
import { StackHeaderLeftButtonProps } from "@react-navigation/stack";
import { Icon } from "react-native-elements";

export const LogoutButton = () => {
  const {
    actions: { signOut },
  } = useContext(AuthContext);
  return (
    <TouchableOpacity style={styles.logoutWrapper} onPress={signOut}>
      <Text style={styles.text}>Log out</Text>
    </TouchableOpacity>
  );
};

export const BackButton = (props: StackHeaderLeftButtonProps) => {
  const { canGoBack, label } = props;
  return canGoBack ? (
    <TouchableOpacity style={styles.backWrapper} {...props}>
      <Icon color={Colors.orange} name="keyboard-arrow-left" />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  logoutWrapper: {
    marginRight: Margin.md,
  },
  backWrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: Margin.sm,
  },
  text: {
    color: Colors.orange,
  },
});
