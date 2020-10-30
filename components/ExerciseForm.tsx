import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  ElementRef,
} from "react";
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
import { useNavigation } from "@react-navigation/native";
import { Margin } from "../constants/Sizes";

export const ExerciseForm = ({
  definition: { id },
}: {
  definition: ExerciseDefinition;
}) => {
  const initialSet: Set[] = [{ reps: 1, value: 5 }];
  const [sets, setSets] = useState<Set[]>(initialSet);
  const [{ loading, error }, exerciseDispatch] = useReducer(
    exerciseReducer,
    initialExerciseState
  );

  const stopwatchRef = useRef<ElementRef<typeof Stopwatch>>(null);

  const navigation = useNavigation();

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
      sets,
      definition: id,
    };
    if (!stopwatchRef.current) {
      return;
    }
    const { getTime, handleReset, hasStarted } = stopwatchRef.current;
    const { msec, sec, min } = getTime();
    if (hasStarted()) {
      const timeTaken = new Date(0);
      timeTaken.setMilliseconds(msec);
      timeTaken.setSeconds(sec);
      timeTaken.setMinutes(min);
      exercise.timeTaken = timeTaken.toISOString();
    }

    await exerciseActions(exerciseDispatch).postExercise(exercise);

    // If there's an error, we don't clear state
    // to give user another attempt at submission
    if (!error) {
      setSets(initialSet);
      handleReset();
      navigation.navigate("ExerciseDetailScreen", {
        definitionId: id,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Stopwatch ref={stopwatchRef} />
      <Button
        style={styles.button}
        title="Done"
        onPress={submitExercise}
        loading={loading}
      />
      <ScrollView>
        {sets.map(({ reps, value }: Set, index: number) => {
          const activeSet = index === 0;
          const setDisplayNumber = sets.length - index;
          return (
            <View
              key={index}
              style={[
                styles.setWrapper,
                !activeSet && styles.inputWrapperInactive,
              ]}
            >
              <Text>{`${
                activeSet
                  ? `Current Set (${setDisplayNumber})`
                  : `Set ${setDisplayNumber}`
              } `}</Text>
              <View style={styles.inputWrapper}>
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
                {!activeSet ? (
                  <Icon
                    containerStyle={styles.icon}
                    name="remove"
                    raised
                    onPress={() => removeSet(index)}
                  />
                ) : (
                  <Icon
                    containerStyle={styles.icon}
                    name="add"
                    raised
                    onPress={() => addSet()}
                  />
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
      <ErrorToast error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: Margin.md,
  },
  container: {
    flex: 1,
    flexGrow: 1,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inputWrapperInactive: {
    opacity: 0.4,
  },
  input: {
    flexGrow: 1,
    width: "30%",
  },
  icon: {
    width: 60,
    margin: 0,
  },
  setWrapper: {
    // minHeight: 50,
  },
});
