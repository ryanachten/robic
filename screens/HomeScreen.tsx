import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Button } from 'react-native-elements';
import { deleteItem } from '../utils/storage';

export default function HomeScreen() {
  const onLogOut = () => deleteItem('token');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button title="Log out" onPress={onLogOut}>
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
