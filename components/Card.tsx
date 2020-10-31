import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";
import { Margin } from "../constants/Sizes";

export const Card = ({ children, style }: View["props"]) => (
  <View style={[styles.container, style]}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 3,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "visible",
    padding: Margin.md,
    width: "100%",
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
});
