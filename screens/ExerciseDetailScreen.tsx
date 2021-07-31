import React, { useCallback, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { FlatList } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, RefreshControl } from "react-native";
import { Text } from "@ui-kitten/components";
import { ExercisesParamList } from "../navigation/types";
import * as actions from "../actions";
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
  getDefinitionById,
  getDefinitionError,
  isDefinitionLoading,
} from "../selectors/exerciseDefinition.selectors";

type Props = StackScreenProps<ExercisesParamList, "ExerciseDetailScreen">;

export default function ExerciseDetailScreen({ route, navigation }: Props) {
  const { definitionId } = route.params;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const definition = useSelector(getDefinitionById(definitionId));
  const loading = useSelector(isDefinitionLoading);
  const error = useSelector(getDefinitionError);

  const fetchDefinitionById = (definitionId: string) =>
    dispatch(actions.requestDefinitionById.started({ id: definitionId }));

  useEffect(() => {
    if (definitionId && isFocused) {
      getDefinitionById(definitionId);
      fetchDefinitionById(definitionId);
    }
  }, [isFocused]);

  const fetchExercise = useCallback(
    () => definitionId && getDefinitionById(definitionId),
    [definitionId, loading]
  );

  const navigateToEditScreen = useCallback(
    () =>
      navigation.navigate("ExerciseEditScreen", {
        definition,
      }),
    [definitionId, loading]
  );

  return (
    <Background>
      <Text style={styles.title}>{definition?.title}</Text>
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
      {definition && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchExercise} />
          }
          keyExtractor={(item) => item.id}
          data={[definition]}
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
