import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Colors } from "../constants/Colors";
import { Margin } from "../constants/Sizes";

export const Background = ({ children, style }: View["props"]) => (
  <View style={styles.container}>
    <LinearGradient
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1.0 }}
      locations={[0, 0.15, 0.85, 1]}
      colors={[Colors.lilac, Colors.white, Colors.white, Colors.lilac]}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: Margin.md,
  },
});
