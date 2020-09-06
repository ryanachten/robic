import React, { useContext, useEffect, useReducer } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { ExercisesParamList } from '../types';
import {
  exerciseDefinitionReducer,
  exerciseDefinitionActions,
  initialExerciseDefinitionState,
} from '../reducers/exerciseDefinition';
import { ExerciseDefinition } from '../constants/Interfaces';

type Props = StackScreenProps<ExercisesParamList, 'ExerciseDetailScreen'>;

export default function ExercisesScreen({ navigation }: Props) {
  const [state, definitionDispatch] = useReducer(
    exerciseDefinitionReducer,
    initialExerciseDefinitionState
  );

  useEffect(() => {
    exerciseDefinitionActions(definitionDispatch).getDefinitions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercises</Text>
      {state.definitions?.map((defintion: ExerciseDefinition) => (
        <Button
          key={defintion.id}
          title={defintion.title}
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
