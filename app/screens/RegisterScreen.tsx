import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Input, Text } from "@ui-kitten/components";
import { AuthContext } from "../services/context";
import { Background, Button, ErrorToast, HintCard, Logo } from "../components";
import { Margin } from "../constants/Sizes";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const {
    state: { error, loadingSignUp },
    actions: { signUp },
  } = useContext(AuthContext);

  const attemptSignUp = async () => {
    setSignedUp(false);
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
        {signedUp && (
          <HintCard
            style={styles.card}
            title="You're all signed up!"
            body="Head to the login screen to get started"
            link="Go to login screen"
            onPress={goToLoginScreen}
          />
        )}
        <Button
          style={styles.button}
          loading={loadingSignUp}
          onPress={attemptSignUp}
        >
          Register
        </Button>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: Margin.md,
  },
  container: {
    alignItems: "center",
    width: "100%",
  },
  card: {
    marginBottom: Margin.md,
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
