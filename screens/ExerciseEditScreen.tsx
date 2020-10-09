import React, { useEffect, useReducer, useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Text, View } from "../components/Themed";
import { ExercisesParamList } from "../types";
import { ExerciseDefinition, Unit } from "../constants/Interfaces";
import { StackScreenProps } from "@react-navigation/stack";
import {
  exerciseDefinitionActions,
  exerciseDefinitionReducer,
  initialExerciseDefinitionState,
} from "../reducers/exerciseDefinition";
import { ErrorToast } from "../components/ErrorToast";
import { Input } from "react-native-elements";
import { Picker } from "native-base";

type Props = StackScreenProps<ExercisesParamList, "ExerciseDetailScreen">;

export default function ExerciseEditScreen({ route }: Props) {
  const [title, setTitle] = useState("");
  const [unit, setUnit] = useState(Unit.kg);

  return (
    <View style={styles.container}>
      <Input
        label="Title"
        placeholder="i.e. Squat"
        value={title}
        onChange={(e) => setTitle(e.nativeEvent.text)}
      />
      <Picker note selectedValue={unit} onValueChange={setUnit}>
        {Object.keys(Unit).map((key, index) => (
          // @ts-ignore - Stupid TS doesn't let us easily get enum value in typesafe manner
          <Picker.Item key={index} label={Unit[key]} value={key} />
        ))}
      </Picker>

      {/* <ErrorToast error={error} /> */}
    </View>
  );
}

const DefinitionDetail = ({
  definition,
}: {
  definition: ExerciseDefinition;
}) => {
  const { unit, type, primaryMuscleGroup } = definition;
  return (
    <View>
      <Text>Unit: {unit}</Text>
      {type && <Text>Type: {type}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
