import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Button, Input } from 'react-native-elements';
import { AuthContext, UserContext } from '../services/context';

export default function HomeScreen() {
  const {
    actions: { signOut },
  } = useContext(AuthContext);
  const {
    state: { firstName },
  } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{firstName}</Text>
      <Button title="Log out" onPress={signOut}>
        Log out
      </Button>
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
