import { Card, Text } from "@ui-kitten/components/ui";
import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Colors } from "../constants/Colors";
import { Margin } from "../constants/Sizes";

interface HintCardProps {
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  title: string;
  body: string;
  link: string;
}

export const HintCard = ({
  body,
  link,
  onPress,
  style,
  title,
}: HintCardProps) => (
  <Card status="primary" style={style} onPress={onPress}>
    <Text category="s1" style={styles.text}>
      {title}
    </Text>
    <Text style={styles.text}>{body}</Text>
    <Text style={styles.link}>{link}</Text>
  </Card>
);

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  link: {
    color: Colors.orange,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: Margin.sm,
  },
});
