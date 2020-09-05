import React, { useState, useContext } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { Input, Card } from 'react-native-elements';
import { AuthContext } from '../services/context';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signedUp, setSignedUp] = useState(false);
  const {
    state: { error },
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
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Input
        label="First name"
        placeholder="John"
        value={firstName}
        onChange={(e) => setFirstName(e.nativeEvent.text)}
      />
      <Input
        label="Last name"
        placeholder="Smith"
        value={lastName}
        onChange={(e) => setLastName(e.nativeEvent.text)}
      />
      <Input
        autoCapitalize="none"
        label="Email"
        placeholder="robic@user.com"
        value={email}
        onChange={(e) => setEmail(e.nativeEvent.text)}
      />
      <Input
        label="Password"
        placeholder="••••••••••••"
        value={password}
        secureTextEntry={true}
        onChange={(e) => setPassword(e.nativeEvent.text)}
      />
      {signedUp ? (
        <Card containerStyle={styles.error} title="You're all signed up!">
          <Text>Head to the login screen to get started</Text>
          {/* TODO: should be modal with link to login screen */}
        </Card>
      ) : null}
      {error ? (
        <Card containerStyle={styles.error} title="Oops!">
          <Text>{error}</Text>
        </Card>
      ) : null}
      <Button title="Register" onPress={attemptSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
