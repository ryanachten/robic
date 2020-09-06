import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Button } from 'react-native-elements';
import { AuthContext, UserContext } from '../services/context';
import { StackScreenProps } from '@react-navigation/stack';
import { ExercisesParamList } from '../types';

type Props = StackScreenProps<ExercisesParamList, 'ExerciseDetailScreen'>;

export default function ExercisesScreen({ navigation }: Props) {
  const {
    actions: { signOut },
  } = useContext(AuthContext);
  const {
    state: { exercises },
  } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercises</Text>
      {exercises?.map((exercise) => (
        <Button
          title={exercise}
          onPress={() => navigation.navigate('ExerciseDetailScreen')}
        ></Button>
      ))}
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
