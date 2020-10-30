import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  ElementRef,
} from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
  exerciseActions,
  ExerciseForPost,
  exerciseReducer,
  initialExerciseState,
} from "../reducers/exercise";
import { ExerciseDefinition, Set } from "../constants/Interfaces";
import { ErrorToast } from "./ErrorToast";
import { Button } from "./Button";
import { Input } from "./Input";
import { Stopwatch } from "./Stopwatch";
import { Text } from "./Themed";
import { Margin } from "../constants/Sizes";
import { Colors } from "../constants/Colors";

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
        containerStyle={styles.button}
        title="Done"
        onPress={submitExercise}
        loading={loading}
      />
      <View style={styles.addSetButton}>
        <Text>Add Set</Text>
        <Icon
          color={Colors.orange}
          containerStyle={styles.addSetButtonIcon}
          name="add"
          raised
          onPress={() => addSet()}
        />
      </View>
      <ScrollView>
        {sets.map(({ reps, value }: Set, index: number) => {
          const activeSet = index === 0;
          const setDisplayNumber = sets.length - index;
          return (
            <View
              key={index}
              style={[!activeSet && styles.inputWrapperInactive]}
            >
              <Text style={styles.setNumber}>{`${
                activeSet
                  ? `Current Set (${setDisplayNumber})`
                  : `Set ${setDisplayNumber}`
              } `}</Text>
              <View style={styles.inputWrapper}>
                <Input
                  containerStyle={styles.inputContainer}
                  label="Reps"
                  keyboardType="numeric"
                  value={reps ? reps.toString() : ""}
                  onChange={({ nativeEvent }) =>
                    updateSet(index, "reps", nativeEvent.text)
                  }
                />
                <Input
                  containerStyle={styles.inputContainer}
                  label="Weight"
                  keyboardType="numeric"
                  value={value ? value.toString() : ""}
                  onChange={({ nativeEvent }) =>
                    updateSet(index, "value", nativeEvent.text)
                  }
                />
                {!activeSet && (
                  <Icon
                    color={Colors.orange}
                    name="remove"
                    onPress={() => removeSet(index)}
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
  addSetButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Margin.md,
  },
  addSetButtonIcon: {
    width: 60,
    margin: 0,
    marginLeft: Margin.sm,
  },
  button: {
    marginBottom: Margin.sm,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    minWidth: "100%",
  },
  inputWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 3,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "visible",
    padding: Margin.md,
    marginBottom: Margin.sm,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  inputWrapperInactive: {
    opacity: 0.4,
  },
  inputContainer: {
    flexGrow: 1,
    width: "30%",
  },
  setNumber: {
    marginBottom: Margin.sm,
  },
});
