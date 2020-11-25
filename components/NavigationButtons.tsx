import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../services/context";
import { Text } from "./Themed";
import { Colors } from "../constants/Colors";
import { Margin } from "../constants/Sizes";
import { StackHeaderLeftButtonProps } from "@react-navigation/stack";
import { Icon } from "./Icon";

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
      <Icon size="sm" fill={Colors.orange} name="chevron-left-outline" />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  backWrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: Margin.sm,
  },
  logoutWrapper: {
    marginRight: Margin.md,
  },
  text: {
    color: Colors.orange,
  },
});
