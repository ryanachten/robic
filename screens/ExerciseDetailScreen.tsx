import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { AuthContext, UserContext } from '../services/context';

export default function ExerciseDetailScreen() {
  const {
    actions: { signOut },
  } = useContext(AuthContext);
  const {
    state: { exercises },
  } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercises Detail</Text>
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
