import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { Colors } from "../constants/Colors";
import { Margin } from "../constants/Sizes";
import { StackHeaderLeftButtonProps } from "@react-navigation/stack";
import { Icon } from "./Icon";
import { useNavigation } from "@react-navigation/native";

export const SettingsButton = () => {
  const nav = useNavigation();
  return (
    <Icon
      fill={Colors.orange}
      size="sm"
      name="more-horizontal-outline"
      onPress={() => nav.navigate("Settings")}
      style={styles.settingsWrapper}
    />
  );
};

export const BackButton = (
  props: StackHeaderLeftButtonProps & {
    backScreenName?: string;
  }
) => {
  const { canGoBack, label, backScreenName } = props;
  const Button = ({ onPress }: { onPress?: () => void }) => (
    <TouchableOpacity
      style={styles.backWrapper}
      {...props}
      onPress={onPress || props.onPress}
    >
      <Icon size="sm" fill={Colors.orange} name="chevron-left-outline" />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );

  if (backScreenName) {
    const nav = useNavigation();
    const goBackToScreen = () => nav.navigate(backScreenName);
    return <Button onPress={goBackToScreen} />;
  }

  return canGoBack ? <Button /> : null;
};

const styles = StyleSheet.create({
  backWrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: Margin.sm,
  },
  logoutWrapper: {
    marginRight: Margin.md,
  },
  settingsWrapper: {
    marginRight: Margin.md,
  },
  text: {
    color: Colors.orange,
  },
});
