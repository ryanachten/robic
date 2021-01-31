import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  ElementRef,
  useContext,
} from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "@ui-kitten/components";
import {
  exerciseActions,
  ExerciseForPost,
  exerciseReducer,
  initialExerciseState,
} from "../reducers/exercise";
import { ExerciseDefinition, Set } from "../constants/Interfaces";
import { ErrorToast } from "./ErrorToast";
import { Button, Fab } from "./Button";
import { Input } from "./Input";
import { Stopwatch } from "./Stopwatch";
import { Margin } from "../constants/Sizes";
import { Colors } from "../constants/Colors";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { ExerciseDefintionContext } from "../services/context";
import { ExerciseCard } from "./ExerciseCard";
import { ExerciseDefinitionState } from "../reducers/exerciseDefinition";

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
  const {
    state: definitionState,
    actions: { getDefinitionById },
  } = useContext(ExerciseDefintionContext);

  const stopwatchRef = useRef<ElementRef<typeof Stopwatch>>(null);

  const navigation = useNavigation();

  // Reset form if definition ID changes
  useEffect(() => {
    setSets(initialSet);
    getDefinitionById(id);
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
      <Button loading={loading} onPress={submitExercise}>
        Done
      </Button>
      <Fab
        containerStyles={styles.addSetButton}
        label="Add Set"
        icon="plus-circle-outline"
        onPress={() => addSet()}
      />
      <ScrollView>
        <PreviousAttempts id={id} definitionState={definitionState} />
        {sets.map(({ reps, value }: Set, index: number) => {
          const activeSet = index === 0;
          const setDisplayNumber = sets.length - index;
          return (
            <View
              key={index}
              style={[!activeSet && styles.inputWrapperInactive]}
            >
              <Text style={styles.setNumber} appearance="hint">{`${
                activeSet
                  ? `Current Set (${setDisplayNumber})`
                  : `Set ${setDisplayNumber}`
              } `}</Text>
              <Card style={styles.inputWrapper}>
                <Input
                  style={[styles.inputContainer, styles.inputRepContainer]}
                  label="Reps"
                  keyboardType="numeric"
                  value={reps ? reps.toString() : ""}
                  onChange={({ nativeEvent }) =>
                    updateSet(index, "reps", nativeEvent.text)
                  }
                />
                <Input
                  style={styles.inputContainer}
                  label="Weight"
                  keyboardType="numeric"
                  value={value ? value.toString() : ""}
                  onChange={({ nativeEvent }) =>
                    updateSet(index, "value", nativeEvent.text)
                  }
                />
                {!activeSet && (
                  <Icon
                    size="sm"
                    fill={Colors.orange}
                    style={styles.inputWrapperDeleteIcon}
                    name="slash-outline"
                    onPress={() => removeSet(index)}
                  />
                )}
              </Card>
            </View>
          );
        })}
      </ScrollView>
      <ErrorToast error={error} />
    </View>
  );
};

const PreviousAttempts = ({
  id, definitionState
}: {
  id: string, definitionState: ExerciseDefinitionState
}) => {
  const { definitions } = definitionState;
  const definition = definitions.find( def => def.id === id);
  if(definition) {
    const {lastSession, personalBest: pb} = definition;
    return (
      <View>
        {pb && pb.topNetExercise && (
          <ExerciseCard
          icon="star-outline"
          title="Personal Best"
          exercise={pb.topNetExercise}
          containerStyle={styles.exerciseCard}
        />)}
        {lastSession && (
          <ExerciseCard
          icon="clock-outline"
          containerStyle={styles.exerciseCard}
          title="Latest Exercise"
          exercise={lastSession}
        />
        )}
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  addSetButton: {
    marginBottom: Margin.md,
  },
  button: {
    marginBottom: Margin.sm,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    minWidth: "100%",
  },
  exerciseCard: {
    marginBottom: Margin.md,
  },
  inputWrapper: {
    alignItems: "center",
    marginBottom: Margin.sm,
  },
  inputWrapperInactive: {
    opacity: 0.5,
  },
  inputContainer: {
    flexGrow: 1,
    width: "30%",
  },
  inputWrapperDeleteIcon: {
    marginLeft: Margin.sm,
  },
  inputRepContainer: {
    marginRight: Margin.sm,
  },
  setNumber: {
    marginBottom: Margin.sm,
  },
});
