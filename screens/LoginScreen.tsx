import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Input, Text } from "@ui-kitten/components";
import * as actions from "../actions";
import { Background, Button, ErrorToast, Logo } from "../components";
import { Margin } from "../constants/Sizes";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, isSignInLoading } from "../selectors/auth.selectors";
import { UserForLogin } from "../constants/Interfaces";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector(isSignInLoading);
  const error = useSelector(getAuthError);

  const signIn = (user: UserForLogin) =>
    dispatch(actions.requestSignIn.started(user));

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
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
        <Button loading={loading} onPress={() => signIn({ email, password })}>
          Login
        </Button>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    width: "100%",
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
