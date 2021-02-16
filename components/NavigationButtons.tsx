import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useContext } from "react";
import { Text } from "@ui-kitten/components";
import { AuthContext } from "../services/context";
import { Colors } from "../constants/Colors";
import { Margin } from "../constants/Sizes";
import { StackHeaderLeftButtonProps } from "@react-navigation/stack";
import { Icon } from "./Icon";
import { useNavigation } from "@react-navigation/native";

// TODO: delete after refactor of log out button into SettingsScreen
export const LogoutButton = () => {
  const {
    actions: { signOut },
  } = useContext(AuthContext);
  return (
    <TouchableOpacity style={styles.logoutWrapper} onPress={signOut}>
      <Text style={styles.text}>Log out</Text>
    </TouchableOpacity>
  );
};

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

export const BackButton = (props: StackHeaderLeftButtonProps) => {
  const { canGoBack, label } = props;
  return canGoBack ? (
    <TouchableOpacity style={styles.backWrapper} {...props}>
      <Icon size="sm" fill={Colors.orange} name="chevron-left-outline" />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  ) : null;
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
