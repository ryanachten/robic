import React, { useCallback, useContext, useEffect, useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  SectionList,
} from "react-native";
import { Spinner, Text } from "@ui-kitten/components";
import { ExercisesParamList } from "../navigation/types";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Background,
  ErrorToast,
  Button,
  Icon,
  ExerciseHistory,
  DefinitionDetail,
} from "../components";
import { FontSize, Margin } from "../constants/Sizes";
import { Colors } from "../constants/Colors";
import { ExerciseContext, ExerciseDefintionContext } from "../services/context";
import { useScreenFocus } from "../hooks/useScreenFocus";
import { FlatList } from "react-native-gesture-handler";

type Props = StackScreenProps<ExercisesParamList, "ExerciseDetailScreen">;

export default function ExerciseDetailScreen({ route, navigation }: Props) {
  const definitionId = route.params ? route.params.definitionId : null;

  const {
    state: { definitions, error, loading },
    actions: { getDefinitionById },
  } = useContext(ExerciseDefintionContext);

  const {
    actions: { getExercisesByDefinition },
  } = useContext(ExerciseContext);

  useScreenFocus(() => {
    if (definitionId) {
      getDefinitionById(definitionId);
      getExercisesByDefinition(definitionId);
    }
  });

  const exercise = useMemo(
    () => definitions.find((def) => def.id === definitionId),
    [definitionId, loading]
  );

  const fetchExercise = useCallback(
    () => definitionId && getDefinitionById(definitionId),
    [definitionId, loading]
  );

  const navigateToEditScreen = useCallback(
    () =>
      navigation.navigate("ExerciseEditScreen", {
        definition: exercise,
      }),
    [definitionId, loading]
  );

  return (
    <Background>
      <Text style={styles.title}>{exercise?.title}</Text>
      <Button
        appearance="outline"
        onPress={navigateToEditScreen}
        style={styles.editButton}
        accessoryRight={() => (
          <Icon fill={Colors.orange} name="edit-outline" size="sm" />
        )}
      >
        Edit
      </Button>
      {exercise && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchExercise} />
          }
          keyExtractor={(item) => item.id}
          data={[exercise]}
          renderItem={({ item }) => (
            <>
              <DefinitionDetail definition={item} />
              <ExerciseHistory definitionId={item.id} />
            </>
          )}
        />
      )}
      <ErrorToast error={error} />
    </Background>
  );
}

const styles = StyleSheet.create({
  editButton: {
    marginBottom: Margin.md,
  },
  title: {
    fontSize: FontSize.heading,
    marginBottom: Margin.md,
  },
});
