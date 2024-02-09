import React, {
  useState,
  useEffect,
  useRef,
  ElementRef,
  useContext,
} from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ExerciseDefinitionSummary, Set, UpdateExercise } from "../../api";
import { ErrorToast } from "../ErrorToast";
import { Button } from "../Button";
import { Stopwatch } from "../Stopwatch";
import { Margin } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";
import { Icon } from "../Icon";
import {
  ExerciseContext,
  ExerciseDefinitionContext,
} from "../../services/context";
import { PreviousAttempts } from "./PreviousAttempts";
import { EffortTillPersonalBest } from "./EffortTillPersonalBest";
import { SetList } from "./SetList";
import { ActiveSets } from "../../constants/Interfaces";

export const ExerciseForm = ({
  definition: { id },
}: {
  definition: ExerciseDefinitionSummary;
}) => {
  const initialSet: ActiveSets[] = [{ reps: "1", value: "5" }];
  const [sets, setSets] = useState<ActiveSets[]>(initialSet);

  const {
    state: { loadingCreateExercise, error },
    actions: { createExercise },
  } = useContext(ExerciseContext);
  const {
    state: definitionState,
    actions: { getDefinitionById },
  } = useContext(ExerciseDefinitionContext);

  const stopwatchRef = useRef<ElementRef<typeof Stopwatch>>(null);

  const navigation = useNavigation();

  // Reset form if definition ID changes
  useEffect(() => {
    setSets(initialSet);
    getDefinitionById(id);
  }, [id]);

  const updateSet = (index: number, field: "reps" | "value", value: string) => {
    const updatedSets = [...sets];
    updatedSets[index][field] = value;
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
    const formattedSets: Set[] = sets.map((s) => ({
      reps: parseInt(s.reps),
      value: parseFloat(s.value),
    }));

    const exercise: UpdateExercise = {
      date: new Date().toISOString(),
      sets: formattedSets,
      definitionId: id,
    };
    if (!stopwatchRef.current) {
      return;
    }
    const { started, msec, sec, min } = stopwatchRef.current.state;
    if (started) {
      const timeTaken = new Date(0);
      timeTaken.setMilliseconds(msec);
      timeTaken.setSeconds(sec);
      timeTaken.setMinutes(min);
      exercise.timeTaken = timeTaken.toISOString();
    }
    await createExercise(exercise);

    // If there's an error, we don't clear state
    // to give user another attempt at submission
    if (!error) {
      setSets(initialSet);
      stopwatchRef.current.handleReset();
      navigation.navigate("Exercises", {
        screen: "ExerciseDetailScreen",
        params: {
          definitionId: id,
        },
      });
    }
  };

  const addIcon = (
    <Icon fill={Colors.orange} name="plus-circle-outline" size="sm" />
  );

  return (
    <View style={styles.container}>
      <Stopwatch ref={stopwatchRef} />
      <View style={styles.buttonWrapper}>
        <Button
          appearance="outline"
          onPress={addSet}
          style={[styles.button, styles.addButton]}
          accessoryRight={addIcon}
        >
          Add Set
        </Button>
        <Button
          style={styles.button}
          loading={loadingCreateExercise}
          onPress={() => submitExercise()}
        >
          Done
        </Button>
      </View>
      <ScrollView>
        <PreviousAttempts definitionState={definitionState} />
        <EffortTillPersonalBest
          currentSets={sets}
          definitionState={definitionState}
        />
        <SetList sets={sets} updateSet={updateSet} removeSet={removeSet} />
      </ScrollView>
      <ErrorToast error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    marginRight: Margin.md,
  },
  button: {
    width: "45%",
    flexGrow: 1,
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    marginBottom: Margin.md,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    minWidth: "100%",
  },
});
