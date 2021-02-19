import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Spinner, Text } from "@ui-kitten/components";
import { Background, Logo } from "../components";
import { Margin } from "../constants/Sizes";
import { AuthContext, UserContext } from "../services/context";

export default function SettingsScreen() {
  const {
    state: { user },
  } = useContext(UserContext);
  const {
    actions: { signOut },
  } = useContext(AuthContext);
  return (
    <Background>
      <Logo style={styles.logo} />
      <Text category="h5" style={styles.title}>
        {user.firstName} {user.lastName}
      </Text>
      <Text style={styles.title}>{user.email}</Text>
      <Button appearance="outline" status="primary" onPress={signOut}>
        Log out
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginBottom: Margin.md,
  },
  title: {
    marginBottom: Margin.md,
  },
});
