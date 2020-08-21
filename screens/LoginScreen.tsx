import React, { useState, Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import { Text, View } from '../components/Themed';

type State = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const [user, setUser]: [State, Dispatch<SetStateAction<State>>] = useState({
    email: '',
    password: '',
  });

  const updateUser = (property: 'email' | 'password', value: string) => {
    const updatedUser = { ...user };
    updatedUser[property] = value;
    setUser(updatedUser);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Input
        label="Email"
        placeholder="robic@user.com"
        leftIcon={<Icon name="envelope" size={24} color="black" />}
        value={user.email}
        onChange={(e) => updateUser('email', e.nativeEvent.text)}
      />
      <Input
        label="Password"
        placeholder="••••••••••••"
        leftIcon={<Icon name="user" size={24} color="black" />}
        value={user.password}
        secureTextEntry={true}
        onChange={(e) => updateUser('password', e.nativeEvent.text)}
      />
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
