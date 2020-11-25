import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Text } from "@ui-kitten/components";
import { AuthContext } from "../services/context";
import { Background, Button, ErrorToast } from "../components";
import { Margin } from "../constants/Sizes";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    state: { error, loading },
    actions: { signIn },
  } = useContext(AuthContext);

  return (
    <Background style={styles.container}>
      <ErrorToast error={error} />
      <Text category="h5" style={styles.title}>
        Login
      </Text>
      <Input
        autoCapitalize="none"
        label="Email"
        placeholder="robic@user.com"
        value={email}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        style={styles.input}
      />
      <Input
        label="Password"
        placeholder="••••••••••••"
        value={password}
        secureTextEntry={true}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        style={styles.input}
      />
      <Button loading={loading} onPress={() => signIn(email, password)}>
        Login
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginBottom: Margin.md,
  },
  title: {
    marginBottom: Margin.md,
  },
});
