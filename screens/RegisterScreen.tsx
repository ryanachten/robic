import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Input, Text } from "@ui-kitten/components";
import { AuthContext } from "../services/context";
import { Background, Button, ErrorToast, Logo } from "../components";
import { Margin } from "../constants/Sizes";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Colors";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedUp, setSignedUp] = useState(true);
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

  const nav = useNavigation();
  const goToLoginScreen = () => nav.navigate("LoginScreen");

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <ErrorToast error={error} />
        <Logo style={styles.logo} />
        <Text category="h5" style={styles.title}>
          Sign up to get started!
        </Text>
        {signedUp ? (
          <Card status="primary" style={styles.card} onPress={goToLoginScreen}>
            <Text style={styles.cardText}>You're all signed up!</Text>
            <Text style={styles.cardText}>
              Head to the login screen to get started
            </Text>
            <Text style={styles.link}>Go to Login screen</Text>
          </Card>
        ) : null}
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
  cardText: {
    textAlign: "center",
  },
  input: {
    marginBottom: Margin.md,
  },
  link: {
    color: Colors.orange,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: Margin.sm,
  },
  logo: {
    marginBottom: Margin.md,
    marginTop: Margin.md,
  },
  title: {
    marginBottom: Margin.md,
  },
});
