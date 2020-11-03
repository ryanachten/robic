import React, { forwardRef, useContext, useReducer, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../components/Themed";
import { ExercisesParamList } from "../types";
import { MuscleGroup, Unit } from "../constants/Interfaces";
import { StackScreenProps } from "@react-navigation/stack";
import { ErrorToast } from "../components/ErrorToast";
import { Badge, Button, CheckBox, Overlay } from "react-native-elements";
import { Picker } from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  exerciseDefinitionActions,
  ExerciseDefinitionForPost,
  exerciseDefinitionReducer,
  initialExerciseDefinitionState,
} from "../reducers/exerciseDefinition";
import { UserContext } from "../services/context";
import { Background, Input } from "../components";
import { Colors } from "../constants/Colors";
import { Margin } from "../constants/Sizes";

type Props = StackScreenProps<ExercisesParamList, "ExerciseEditScreen">;

export default function ExerciseEditScreen({ navigation }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [unit, setUnit] = useState("");
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([]);

  const {
    state: { id = "" },
  } = useContext(UserContext);

  const [{ error, loading }, definitionDispatch] = useReducer(
    exerciseDefinitionReducer,
    initialExerciseDefinitionState
  );

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
        containerStyle={styles.input}
        label="Title"
        placeholder="i.e. Squat"
        value={title}
        onChange={(e) => setTitle(e.nativeEvent.text)}
      />
      <Input
        containerStyle={styles.input}
        label="Unit"
        InputComponent={forwardRef(() => (
          <Picker
            note
            selectedValue={unit}
            placeholder="Select unit"
            onValueChange={setUnit}
          >
            {Object.keys(Unit).map((key, index) => (
              <Picker.Item key={index} label={key} value={key} />
            ))}
          </Picker>
        ))}
      />
      <Input
        containerStyle={styles.input}
        label="Muscle Groups"
        InputComponent={forwardRef(() => (
          <View style={styles.badgeWrapper}>
            {muscleGroups.length === 0 ? (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.placeholder}>
                  Select exercise muscle group
                </Text>
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
        ))}
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

      <ErrorToast error={error} />
    </Background>
  );
}

const styles = StyleSheet.create({
  badgeWrapper: {
    flex: 1,
    flexDirection: "row",
    marginBottom: Margin.sm,
    marginTop: Margin.sm,
  },
  input: {
    marginBottom: Margin.md,
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
