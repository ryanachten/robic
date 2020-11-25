import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import {
  Button as KittenButton,
  ButtonProps as KittenButtonProps,
  Spinner,
  Text,
} from "@ui-kitten/components";
import { Colors } from "../constants/Colors";
import { Margin } from "../constants/Sizes";
import { Icon } from "./Icon";

type ButtonProps = KittenButtonProps & {
  loading?: boolean;
};

const LoadingIndicator = () => (
  <View style={styles.loadingIndicator}>
    <Spinner size="small" status="control" />
  </View>
);

export const Button = (props: ButtonProps) => (
  <KittenButton
    {...props}
    accessoryLeft={props.loading ? LoadingIndicator : undefined}
  />
);

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
        size="md"
        fill={Colors.orange}
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
    margin: 0,
    marginLeft: Margin.xs,
  },
  loadingIndicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});
