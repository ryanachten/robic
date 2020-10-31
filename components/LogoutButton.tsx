import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../services/context";
import { Text } from "./Themed";
import { Colors } from "../constants/Colors";
import { Margin } from "../constants/Sizes";

export const LogoutButton = () => {
  const {
    actions: { signOut },
  } = useContext(AuthContext);
  return (
    <TouchableOpacity style={styles.input} onPress={signOut}>
      <Text style={styles.text}>Log out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    marginRight: Margin.md,
  },
  text: {
    color: Colors.orange,
  },
});
