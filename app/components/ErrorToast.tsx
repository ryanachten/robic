import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { Margin } from "../constants/Sizes";

export const ErrorToast = ({
  error,
}: {
  error: Error | string | null | undefined;
}) => {
  // Handle both Error objects and string messages
  const message = error instanceof Error ? error.message : error;
  if (message) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>
      </View>
    );
  }
  return <View></View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.red,
    marginBottom: Margin.sm,
    marginTop: Margin.sm,
    justifyContent: "center",
    minWidth: "100%",
    padding: Margin.sm,
    width: "100%",
    zIndex: 99,
  },
  text: {
    color: Colors.white,
  },
});
