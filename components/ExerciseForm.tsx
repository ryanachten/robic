import React, { useState, Dispatch, useEffect } from 'react';
import { ExerciseDefinition, Set } from '../constants/Interfaces';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';

export const ExerciseForm = ({
  definition: { id },
}: {
  definition: ExerciseDefinition;
}) => {
  const initialSet: Set[] = [{ reps: 1, value: 5 }];
  const [sets, setSets]: [Set[], Dispatch<Set[]>] = useState(initialSet);

  // Reset form if definition ID changes
  useEffect(() => {
    setSets(initialSet);
  }, [id]);

  const updateSet = (index: number, field: 'reps' | 'value', value: string) => {
    const updatedSets = [...sets];
    updatedSets[index][field] = parseInt(value);
    setSets(updatedSets);
  };

  const addSet = () => {
    const updatedSets = [...sets, { ...sets[sets.length - 1] }];
    setSets(updatedSets);
  };

  const removeSet = (index: number) => {
    const updatedSets = [...sets];
    updatedSets.splice(index, 1);
    setSets(updatedSets);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {sets.map(({ reps, value }: Set, index: number) => (
        <View key={index} style={styles.setWrapper}>
          <Input
            containerStyle={styles.input}
            label="Reps"
            keyboardType="numeric"
            value={reps ? reps.toString() : ''}
            onChange={({ nativeEvent }) =>
              updateSet(index, 'reps', nativeEvent.text)
            }
          />
          <Input
            containerStyle={styles.input}
            label="Weight"
            keyboardType="numeric"
            value={value ? value.toString() : ''}
            onChange={({ nativeEvent }) =>
              updateSet(index, 'value', nativeEvent.text)
            }
          />
          {index > 0 && (
            <Icon name="remove" raised onPress={() => removeSet(index)} />
          )}
        </View>
      ))}
      <Button title="Add set" onPress={() => addSet()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  setWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  input: {
    width: '30%',
  },
});
