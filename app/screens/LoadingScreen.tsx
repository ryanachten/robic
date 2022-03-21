import React from "react";
import { StyleSheet } from "react-native";
import { Spinner, Text } from "@ui-kitten/components";
import { Background, Logo } from "../components";
import { Margin } from "../constants/Sizes";

export default function LoadingScreen() {
  return (
    <Background style={styles.container}>
      <Logo style={styles.logo} />
      <Text category="h5" style={styles.title}>
        Getting ready!
      </Text>
      <Spinner size="giant" />
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginBottom: Margin.md,
  },
  title: {
    marginBottom: Margin.md,
  },
});
