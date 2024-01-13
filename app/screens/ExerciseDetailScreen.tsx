import React, { useCallback, useContext, useEffect } from "react";
import { StyleSheet, RefreshControl } from "react-native";
import { Text } from "@ui-kitten/components";
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
import {
  ExerciseContext,
  ExerciseDefinitionContext,
} from "../services/context";
import { FlatList } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

type Props = StackScreenProps<ExercisesParamList, "ExerciseDetailScreen">;

export default function ExerciseDetailScreen({
  route,
  navigation,
}: Readonly<Props>) {
  const definitionId = route.params ? route.params.definitionId : null;

  const isFocused = useIsFocused();

  const {
    state: { definitionDetail, error, loadingDefinition },
    actions: { getDefinitionById },
  } = useContext(ExerciseDefinitionContext);

  const {
    actions: { getExercisesByDefinition },
  } = useContext(ExerciseContext);

  useEffect(() => {
    if (definitionId && isFocused) {
      getDefinitionById(definitionId);
      getExercisesByDefinition(definitionId);
    }
  }, [isFocused]);

  const fetchExercise = useCallback(
    () => definitionId && getDefinitionById(definitionId),
    [definitionId, loadingDefinition]
  );

  const navigateToEditScreen = useCallback(
    () =>
      navigation.navigate("ExerciseEditScreen", {
        definition: definitionDetail,
      }),
    [definitionId, loadingDefinition]
  );

  const renderEditIcon = () => (
    <Icon fill={Colors.orange} name="edit-outline" size="sm" />
  );

  return (
    <Background>
      <Text style={styles.title}>{definitionDetail?.title}</Text>
      <Button
        appearance="outline"
        onPress={navigateToEditScreen}
        style={styles.editButton}
        accessoryRight={renderEditIcon}
      >
        Edit
      </Button>
      {definitionDetail && (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loadingDefinition}
              onRefresh={fetchExercise}
            />
          }
          keyExtractor={(item) => item.id.toString()}
          data={[definitionDetail]}
          renderItem={({ item }) => (
            <>
              <DefinitionDetail definition={item} />
              <ExerciseHistory />
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
