import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input, Card } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import { User } from '../constants/Interfaces';
import { UserContext, AuthContext } from '../services/context';

type Context = {
  user: User;
  userDispatch: React.Dispatch<UserAction>;
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userDispatch } = useContext(UserContext) as Context;
  const {
    state: { error },
    actions: { signIn },
  } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input
        label="Email"
        placeholder="robic@user.com"
        leftIcon={<Icon name="envelope" size={24} color="black" />}
        value={email}
        onChange={(e) => setEmail(e.nativeEvent.text)}
      />
      <Input
        label="Password"
        placeholder="••••••••••••"
        leftIcon={<Icon name="user" size={24} color="black" />}
        value={password}
        secureTextEntry={true}
        onChange={(e) => setPassword(e.nativeEvent.text)}
      />
      {error ? (
        <Card containerStyle={styles.error} title="Oops!">
          <Text>{error}</Text>
        </Card>
      ) : null}
      <Button title="Login" onPress={() => signIn(email, password)} />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
