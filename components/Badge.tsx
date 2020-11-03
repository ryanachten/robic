import React from "react";
import { StyleSheet } from "react-native";
import { Badge as RnBadge, BadgeProps } from "react-native-elements";
import { Colors } from "../constants/Colors";
import { FontSize, Margin } from "../constants/Sizes";

export const Badge = (props: BadgeProps) => (
  <RnBadge
    badgeStyle={[styles.badge, props.badgeStyle]}
    textStyle={[styles.text, props.textStyle]}
    {...props}
  />
);

const styles = StyleSheet.create({
  badge: {
    height: 40,
    backgroundColor: Colors.orange,
  },
  text: {
    fontSize: FontSize.caption,
    margin: Margin.sm,
  },
});
