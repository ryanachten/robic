import React, { useState, useEffect, useRef, ElementRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import {
  ExerciseDefinition,
  ExerciseForCreate,
  FormSet,
  Set,
} from "../../constants/Interfaces";
import { ErrorToast } from "../ErrorToast";
import { Button } from "../Button";
import { Stopwatch } from "../Stopwatch";
import { Margin } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";
import { Icon } from "../Icon";
import { PreviousAttempts } from "./PreviousAttempts";
import { EffortTillPersonalBest } from "./EffortTillPersonalBest";
import { SetList } from "./SetList";
import {
  getExercisesError,
  isDefinitionExercisesLoading,
} from "../../selectors/exercise.selectors";

export const ExerciseForm = ({
  definition: { id },
}: {
  definition: ExerciseDefinition;
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const stopwatchRef = useRef<ElementRef<typeof Stopwatch>>(null);

  const initialSet: FormSet[] = [{ reps: "1", value: "5" }];
  const [sets, setSets] = useState<FormSet[]>(initialSet);

  const loading = useSelector(isDefinitionExercisesLoading);
  const error = useSelector(getExercisesError);

  const fetchDefinitionById = (definitionId: string) =>
    dispatch(actions.requestDefinitionById.started({ id: definitionId }));

  const createExercise = (exercise: ExerciseForCreate) =>
    dispatch(actions.createExercise.started({ exercise }));

  // Reset form if definition ID changes
  useEffect(() => {
    setSets(initialSet);
    fetchDefinitionById(id);
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
    const setsForSumission: Set[] = sets.map(({ reps, value }) => ({
      reps: parseFloat(reps),
      value: parseFloat(value),
    }));
    const exercise: ExerciseForCreate = {
      sets: setsForSumission,
      definition: id,
    };
    if (!stopwatchRef.current) {
      return console.warn("ExerciseForm: Couldn't find stopwatch ref");
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

  return (
    <View style={styles.container}>
      <Stopwatch ref={stopwatchRef} />
      <View style={styles.buttonWrapper}>
        <Button
          appearance="outline"
          onPress={addSet}
          style={[styles.button, styles.addButton]}
          accessoryRight={() => (
            <Icon fill={Colors.orange} name="plus-circle-outline" size="sm" />
          )}
        >
          Add Set
        </Button>
        <Button
          style={styles.button}
          loading={loading}
          onPress={() => submitExercise()}
        >
          Done
        </Button>
      </View>
      <ScrollView>
        <PreviousAttempts id={id} />
        <EffortTillPersonalBest id={id} currentSets={sets} />
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
