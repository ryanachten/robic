import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ExercisesParamList } from "../navigation/types";
import { MuscleGroup, Unit, UpdateExerciseDefinition } from "../api";
import { StackScreenProps } from "@react-navigation/stack";
import { ErrorToast } from "../components/ErrorToast";
import { ExerciseDefinitionContext, UserContext } from "../services/context";
import { Background, Button } from "../components";
import { Colors } from "../constants/Colors";
import { Margin } from "../constants/Sizes";
import { Input, IndexPath, Select, SelectItem } from "@ui-kitten/components";

type Props = StackScreenProps<ExercisesParamList, "ExerciseEditScreen">;

const sortMuscleGroups = (a: string, b: string): number => (a > b ? 1 : -1);

export default function ExerciseEditScreen({ navigation, route }: Props) {
  const [title, setTitle] = useState("");

  const {
    state: { user },
  } = useContext(UserContext);

  const {
    state: { error, loadingUpdateDefinition, loadingSavingDefinition },
    actions: { createDefinition, editDefinition },
  } = useContext(ExerciseDefinitionContext);

  const [selectedUnitIndex, setSelectedUnitIndex] = useState<IndexPath>(
    new IndexPath(0)
  );

  const allUnits = Object.keys(Unit);
  const unit = allUnits[selectedUnitIndex.row] as Unit;

  const [selectedMuscleIndex, setSelectedMuscleIndex] = useState<IndexPath[]>(
    []
  );

  const allMuscleGroups = Object.keys(MuscleGroup).sort(sortMuscleGroups);
  const muscleGroups = selectedMuscleIndex.map(
    (index) => allMuscleGroups[index.row]
  ) as MuscleGroup[];

  // If a definition is passed, we use form as an edit screen
  // Otherwise, we use it to create a new exercise definition
  const existingDefinition = route?.params?.definition;
  useEffect(() => {
    if (existingDefinition) {
      setTitle(existingDefinition.title);

      const unitIndex = allUnits.findIndex(
        (u) => u === existingDefinition.unit
      );
      setSelectedUnitIndex(new IndexPath(unitIndex));

      const muscleIndices: number[] = existingDefinition.primaryMuscleGroup
        ? existingDefinition.primaryMuscleGroup.map((m) =>
            allMuscleGroups.findIndex((mu) => mu === m)
          )
        : [];
      setSelectedMuscleIndex(muscleIndices.map((i) => new IndexPath(i)));
    }
  }, []);

  const createExercise = async () => {
    const exercise: UpdateExerciseDefinition = {
      userId: user.id,
      title,
      unit,
      primaryMuscleGroup: muscleGroups,
    };

    const definition = await createDefinition(exercise);

    if (!error) {
      if (definition) {
        navigation.navigate("ExerciseDetailScreen", {
          definitionId: definition.id,
        });
      }
    }
  };

  const updateExercise = async () => {
    if (!existingDefinition) {
      return;
    }
    const exercise: UpdateExerciseDefinition = {
      userId: user.id,
      title,
      unit,
      primaryMuscleGroup: muscleGroups,
    };

    const definition = await editDefinition(existingDefinition.id, exercise);

    if (!error) {
      if (definition) {
        navigation.navigate("ExerciseDetailScreen", {
          definitionId: definition.id,
        });
      }
    }
  };

  return (
    <Background>
      <Input
        style={styles.input}
        label="Title"
        placeholder="i.e. Squat"
        value={title}
        onChange={(e) => setTitle(e.nativeEvent.text)}
      />
      <Select
        label="Select unit"
        value={unit}
        style={styles.picker}
        selectedIndex={selectedUnitIndex}
        onSelect={(index) => setSelectedUnitIndex(index as IndexPath)}
      >
        {allUnits.map((unit) => (
          <SelectItem key={unit} title={unit} />
        ))}
      </Select>
      <Select
        label="Select muscle groups"
        multiSelect={true}
        value={muscleGroups.join(", ")}
        style={styles.picker}
        selectedIndex={selectedMuscleIndex}
        onSelect={(index) => setSelectedMuscleIndex(index as IndexPath[])}
        placeholder="i.e. Glutes"
      >
        {allMuscleGroups.map((muscle) => (
          <SelectItem key={muscle} title={muscle} />
        ))}
      </Select>
      {existingDefinition ? (
        <Button
          loading={loadingUpdateDefinition}
          onPress={() => updateExercise()}
        >
          Update exercise
        </Button>
      ) : (
        <Button
          loading={loadingSavingDefinition}
          onPress={() => createExercise()}
        >
          Create exercise
        </Button>
      )}
      <ErrorToast error={error} />
    </Background>
  );
}

const styles = StyleSheet.create({
  badgeWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: Margin.sm,
    marginTop: Margin.sm,
  },
  checkbox: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: Margin.sm,
    padding: 0,
  },
  input: {
    marginBottom: Margin.md,
  },
  picker: {
    marginBottom: Margin.md,
    width: "100%",
  },
  overlay: {
    height: "80%",
    width: "80%",
    padding: Margin.md,
  },
  placeholder: {
    color: Colors.grey,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
