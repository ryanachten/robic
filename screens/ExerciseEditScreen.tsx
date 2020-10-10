import React, { useReducer, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { ExercisesParamList } from "../types";
import { MuscleGroup, Unit } from "../constants/Interfaces";
import { StackScreenProps } from "@react-navigation/stack";
import { ErrorToast } from "../components/ErrorToast";
import { Badge, Button, CheckBox, Input, Overlay } from "react-native-elements";
import { Picker } from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  exerciseDefinitionActions,
  ExerciseDefinitionForPost,
  exerciseDefinitionReducer,
  initialExerciseDefinitionState,
} from "../reducers/exerciseDefinition";

type Props = StackScreenProps<ExercisesParamList, "ExerciseEditScreen">;

export default function ExerciseEditScreen({ navigation }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [unit, setUnit] = useState(Unit.bodyweight);
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([]);

  const [{ definitions, error, loading }, definitionDispatch] = useReducer(
    exerciseDefinitionReducer,
    initialExerciseDefinitionState
  );

  error && console.log("error", error);

  const createExercise = async () => {
    const exercise: ExerciseDefinitionForPost = {
      title,
      unit,
      primaryMuscleGroup: muscleGroups,
    };
    await exerciseDefinitionActions(definitionDispatch).postDefinition(
      exercise
    );
    if (!error) {
      const definition = definitions.find((def) => def.title === title);
      if (definition) {
        navigation.navigate("ExerciseDetailScreen", {
          definitionId: definition.id,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Title"
        placeholder="i.e. Squat"
        value={title}
        onChange={(e) => setTitle(e.nativeEvent.text)}
      />
      <Input
        label="Unit"
        InputComponent={() => (
          <Picker note selectedValue={unit} onValueChange={setUnit}>
            {Object.keys(Unit).map((key, index) => (
              <Picker.Item key={index} label={key} value={key} />
            ))}
          </Picker>
        )}
      />
      <Input
        label="Muscle Groups"
        InputComponent={() => (
          <View style={styles.badgeWrapper}>
            {muscleGroups.length === 0 ? (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>Select exercise muscle group</Text>
              </TouchableOpacity>
            ) : (
              muscleGroups.map((group, index) => (
                <Badge
                  key={index}
                  value={group}
                  onPress={() => setModalVisible(true)}
                />
              ))
            )}
          </View>
        )}
      />
      <Overlay
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <ScrollView>
          {Object.keys(MuscleGroup).map((key, index) => (
            <CheckBox
              key={index}
              title={key}
              checked={muscleGroups.includes(key as MuscleGroup)}
              onPress={() => {
                const groups = [...muscleGroups];
                const index = groups.findIndex((group) => group === key);
                index === -1
                  ? groups.push(key as MuscleGroup)
                  : groups.splice(index, 1);
                setMuscleGroups(groups);
              }}
            />
          ))}
        </ScrollView>
      </Overlay>
      <Button
        title="Create exercise"
        loading={loading}
        onPress={() => createExercise()}
      />

      {/* <ErrorToast error={error} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeWrapper: {
    flex: 1,
    flexDirection: "row",
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
