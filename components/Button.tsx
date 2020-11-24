import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import {
  Icon,
  Button as KittenButton,
  ButtonProps,
} from "@ui-kitten/components";
import { Colors } from "../constants/Colors";
import { Margin } from "../constants/Sizes";
import { Text } from "./Themed";

export const Button = (props: ButtonProps) => <KittenButton {...props} />;

type FabProps = {
  icon: string;
  label: string;
  containerStyles?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void;
};

export const Fab = ({ containerStyles, icon, label, onPress }: FabProps) => {
  return (
    <View style={[styles.fabContainer, containerStyles]}>
      <Text>{label}</Text>
      <Icon
        fill={Colors.orange}
        styles={styles.fabIcon}
        name={icon}
        style={styles.fabIcon}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Margin.md,
    maxHeight: 60,
    minHeight: 60,
  },
  fabIcon: {
    height: 32,
    width: 32,
    margin: 0,
    marginLeft: Margin.sm,
  },
});
