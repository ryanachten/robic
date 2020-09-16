import React, { useState, Dispatch } from 'react';
import { ExerciseDefinition, Set } from '../constants/Interfaces';
import { ScrollView, View } from 'react-native';
import { Input, Button } from 'react-native-elements';

export const ExerciseForm = ({
  definition,
}: {
  definition: ExerciseDefinition;
}) => {
  const initialSet: Set[] = [{ reps: 0, value: 5 }];
  const [sets, setSets]: [Set[], Dispatch<Set[]>] = useState(initialSet);

  const updateSet = (index: number, field: 'reps' | 'value', value: string) => {
    const updatedSets = [...sets];
    updatedSets[index][field] = parseInt(value);
    setSets(updatedSets);
  };

  const addSet = () => {
    const updatedSets = [...sets, { ...sets[sets.length - 1] }];
    setSets(updatedSets);
  };

  return (
    <ScrollView>
      {sets.map(({ reps, value }: Set, index: number) => (
        <View key={index}>
          <Input
            label="Reps"
            keyboardType="numeric"
            value={reps ? reps.toString() : ''}
            onChange={(e) => updateSet(index, 'reps', e.nativeEvent.text)}
          />
          <Input
            label="Weight"
            keyboardType="numeric"
            value={value ? value.toString() : ''}
            onChange={(e) => updateSet(index, 'value', e.nativeEvent.text)}
          />
        </View>
      ))}
      <Button title="Add set" onPress={addSet} />
    </ScrollView>
  );
};
