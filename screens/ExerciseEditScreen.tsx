import React, { useContext, useReducer, useState } from "react";
import { StyleSheet } from "react-native";
import { ExercisesParamList } from "../types";
import { MuscleGroup, Unit } from "../constants/Interfaces";
import { StackScreenProps } from "@react-navigation/stack";
import { ErrorToast } from "../components/ErrorToast";
import {
  exerciseDefinitionActions,
  ExerciseDefinitionForPost,
  exerciseDefinitionReducer,
  initialExerciseDefinitionState,
} from "../reducers/exerciseDefinition";
import { UserContext } from "../services/context";
import { Background, Button } from "../components";
import { Colors } from "../constants/Colors";
import { Margin } from "../constants/Sizes";
import { Input, IndexPath, Select, SelectItem } from "@ui-kitten/components";

type Props = StackScreenProps<ExercisesParamList, "ExerciseEditScreen">;

export default function ExerciseEditScreen({ navigation }: Props) {
  const [title, setTitle] = useState("");

  const {
    state: { id = "" },
  } = useContext(UserContext);

  const [{ error, loading }, definitionDispatch] = useReducer(
    exerciseDefinitionReducer,
    initialExerciseDefinitionState
  );

  const [selectedUnitIndex, setSelectedUnitIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  const unit = Object.keys(Unit)[selectedUnitIndex.row] as Unit;

  const [selectedMuscleIndex, setSelectedMuscleIndex] = useState<IndexPath[]>(
    []
  );
  const muscleGroups = selectedMuscleIndex.map(
    (index) => Object.keys(MuscleGroup)[index.row]
  ) as MuscleGroup[];

  const createExercise = async () => {
    const exercise: ExerciseDefinitionForPost = {
      title,
      unit,
      user: id,
      primaryMuscleGroup: muscleGroups,
    };

    const definition = await exerciseDefinitionActions(
      definitionDispatch
    ).postDefinition(exercise);

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
        {Object.keys(Unit).map((unit) => (
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
        {Object.keys(MuscleGroup).map((muscle) => (
          <SelectItem key={muscle} title={muscle} />
        ))}
      </Select>
      <Button
        title="Create exercise"
        loading={loading}
        onPress={() => createExercise()}
      />
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
