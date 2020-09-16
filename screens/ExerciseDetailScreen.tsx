import React, { useEffect, useReducer } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Text, View } from '../components/Themed';
import { ExercisesParamList } from '../types';
import { ExerciseDefinition } from '../constants/Interfaces';
import { StackScreenProps } from '@react-navigation/stack';
import {
  exerciseDefinitionActions,
  exerciseDefinitionReducer,
  initialExerciseDefinitionState,
} from '../reducers/exerciseDefinition';

type Props = StackScreenProps<ExercisesParamList, 'ExerciseDetailScreen'>;

export default function ExerciseDetailScreen({ route }: Props) {
  const definitionId = route.params ? route.params.definitionId : null;

  const [state, definitionDispatch] = useReducer(
    exerciseDefinitionReducer,
    initialExerciseDefinitionState
  );

  useEffect(() => {
    definitionId &&
      exerciseDefinitionActions(definitionDispatch).getDefinitionById(
        definitionId
      );
  }, []);

  const { definitions, error, loading } = state;
  const exercise = definitions.find((def) => def.id === definitionId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise?.title}</Text>
      {loading && <ActivityIndicator size="large" />}
      {exercise && <DefinitionDetail definition={exercise} />}
    </View>
  );
}

const DefinitionDetail = ({
  definition,
}: {
  definition: ExerciseDefinition;
}) => {
  const { unit, type, primaryMuscleGroup } = definition;
  return (
    <View>
      <Text>Unit: {unit}</Text>
      {type && <Text>Type: {type}</Text>}
    </View>
  );
};

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
