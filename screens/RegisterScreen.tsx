import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Input, Text } from "@ui-kitten/components";
import { AuthContext } from "../services/context";
import { Background, Button, ErrorToast, Logo } from "../components";
import { Margin } from "../constants/Sizes";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const {
    state: { error, loading },
    actions: { signUp },
  } = useContext(AuthContext);

  const attemptSignUp = async () => {
    await signUp({
      firstName,
      lastName,
      email,
      password,
    });
    setSignedUp(true);
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <ErrorToast error={error} />
        <Logo style={styles.logo} />
        <Text category="h5" style={styles.title}>
          Sign up to get started!
        </Text>
        <Input
          label="First name"
          placeholder="John"
          value={firstName}
          style={styles.input}
          onChange={(e) => setFirstName(e.nativeEvent.text)}
        />
        <Input
          label="Last name"
          placeholder="Smith"
          value={lastName}
          style={styles.input}
          onChange={(e) => setLastName(e.nativeEvent.text)}
        />
        <Input
          autoCapitalize="none"
          label="Email"
          placeholder="robic@user.com"
          value={email}
          style={styles.input}
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />
        <Input
          label="Password"
          placeholder="••••••••••••"
          value={password}
          secureTextEntry={true}
          style={styles.input}
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />
        {signedUp ? (
          <Card style={styles.card}>
            <Text>You're all signed up!</Text>
            <Text>Head to the login screen to get started</Text>
            {/* TODO: should be modal with link to login screen */}
          </Card>
        ) : null}
        <Button loading={loading} onPress={attemptSignUp}>
          Register
        </Button>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  card: {
    marginBottom: 30,
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
