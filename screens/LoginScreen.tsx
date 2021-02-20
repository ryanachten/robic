import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Input, Text } from "@ui-kitten/components";
import { AuthContext } from "../services/context";
import { Background, Button, ErrorToast, Logo } from "../components";
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
      <ScrollView>
        <ErrorToast error={error} />
        <Logo style={styles.logo} />
        <Text category="h5" style={styles.title}>
          Login to get started!
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
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    marginBottom: Margin.md,
  },
  logo: {
    marginBottom: Margin.md,
    marginTop: Margin.md,
  },
  title: {
    marginBottom: Margin.md,
  },
});
