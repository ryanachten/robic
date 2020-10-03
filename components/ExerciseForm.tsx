import React, { useState, useEffect, useReducer } from "react";
import { ExerciseDefinition, Set } from "../constants/Interfaces";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import { Stopwatch } from "./Stopwatch";
import {
  exerciseActions,
  ExerciseForPost,
  exerciseReducer,
  initialExerciseState,
} from "../reducers/exercise";
import { ErrorToast } from "./ErrorToast";

export const ExerciseForm = ({
  definition: { id },
}: {
  definition: ExerciseDefinition;
}) => {
  const initialSet: Set[] = [{ reps: 1, value: 5 }];
  const [sets, setSets] = useState<Set[]>(initialSet);
  const [time, setTime] = useState<{
    msec: number;
    sec: number;
    min: number;
  } | null>(null);

  const [{ loading, error }, exerciseDispatch] = useReducer(
    exerciseReducer,
    initialExerciseState
  );

  // Reset form if definition ID changes
  useEffect(() => {
    setSets(initialSet);
  }, [id]);

  const updateSet = (index: number, field: "reps" | "value", value: string) => {
    const updatedSets = [...sets];
    updatedSets[index][field] = parseInt(value);
    setSets(updatedSets);
  };

  const addSet = () => {
    const updatedSets = [{ ...sets[0] }, ...sets];
    setSets(updatedSets);
  };

  const removeSet = (index: number) => {
    const updatedSets = [...sets];
    updatedSets.splice(index, 1);
    setSets(updatedSets);
  };

  const submitExercise = async () => {
    const exercise: ExerciseForPost = {
      definiton: id,
      sets: [],
    };
    if (time) {
      const { msec, sec, min } = time;
      const timeTaken = new Date(0);
      timeTaken.setMilliseconds(msec);
      timeTaken.setSeconds(sec);
      timeTaken.setMinutes(min);
      exercise.timeTaken = timeTaken.toString();
    }
    await exerciseActions(exerciseDispatch).postExercise(exercise);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stopwatch getTime={setTime} />
      <Icon name="add" raised onPress={() => addSet()} />
      {sets.map(({ reps, value }: Set, index: number) => (
        <View key={index}>
          <Text>Set: {sets.length - index}</Text>
          <View style={styles.setWrapper}>
            <Input
              containerStyle={styles.input}
              label="Reps"
              keyboardType="numeric"
              value={reps ? reps.toString() : ""}
              onChange={({ nativeEvent }) =>
                updateSet(index, "reps", nativeEvent.text)
              }
            />
            <Input
              containerStyle={styles.input}
              label="Weight"
              keyboardType="numeric"
              value={value ? value.toString() : ""}
              onChange={({ nativeEvent }) =>
                updateSet(index, "value", nativeEvent.text)
              }
            />
            {index > 0 ? (
              <Icon
                containerStyle={styles.icon}
                name="remove"
                raised
                onPress={() => removeSet(index)}
              />
            ) : (
              <View style={styles.icon} />
            )}
          </View>
        </View>
      ))}
      <Button title="Done" onPress={submitExercise} loading={loading} />
      <ErrorToast error={error} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  setWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  icon: {
    width: 60,
    margin: 0,
  },
  input: {
    flexGrow: 1,
    width: "30%",
  },
});
