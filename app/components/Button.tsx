import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button as KittenButton,
  ButtonProps as KittenButtonProps,
  Spinner,
} from "@ui-kitten/components";

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

const styles = StyleSheet.create({
  loadingIndicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});
