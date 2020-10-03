import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ErrorCard = ({
  error,
}: {
  error: Error | string | undefined | null;
}) => {
  // Reset error state if error message changes
  const [showError, setShowError] = useState(true);
  useEffect(() => {
    setShowError(true);
  }, [error]);

  // Handle both Error objects and string messages
  const message = error instanceof Error ? error.message : error;

  return error && showError ? (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Oops! Something went wrong...</Text>
        <Text style={styles.text}>{message}</Text>
        <TouchableOpacity onPress={() => setShowError(false)}>
          <Text>Okay</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexShrink: 1,
    justifyContent: "center",
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: "red",
    flexShrink: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});
