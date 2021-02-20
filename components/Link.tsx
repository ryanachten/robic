import React from "react";
import * as WebBrowser from "expo-web-browser";
import { StyleSheet, TouchableHighlight } from "react-native";
import { Text } from "@ui-kitten/components";
import { Colors } from "../constants/Colors";

interface LinkProps {
  url: string;
  children: string;
}

export const Link = ({ url, children }: LinkProps) => {
  const openLink = async () => await WebBrowser.openBrowserAsync(url);
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="transparent"
      onPress={openLink}
    >
      <Text style={styles.link}>{children}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  link: {
    color: Colors.orange,
  },
});
