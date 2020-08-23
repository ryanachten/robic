import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input } from 'react-native-elements';
import { Axios } from '../constants/Api';
import { Text, View } from '../components/Themed';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = async () => {
    try {
      const response = await Axios.post('/api/auth/login', {
        email,
        password,
      });
      console.log('response', response);
    } catch (error) {
      console.log('error', JSON.stringify(error));
    }
  };

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
      <Button title="Login" onPress={submitLogin} />
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
