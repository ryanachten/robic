import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, RefreshControl, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import * as actions from "../actions";
import { Background, Button, ErrorToast, Icon } from "../components";
import { ExercisesParamList } from "../navigation/types";
import { ExerciseDefinition } from "../constants/Interfaces";
import {
  filterBySearchTerm,
  SortBy,
  sortByDate,
  sortByImprovement,
  sortByNumberOfSessions,
} from "../utilities/searchHelpers";
import { FontSize, Margin } from "../constants/Sizes";
import { Colors } from "../constants/Colors";
import {
  Input,
  IndexPath,
  Select,
  SelectItem,
  Text,
  Card,
} from "@ui-kitten/components";
import { formatRelativeDate } from "../utilities/dateHelpers";
import { useDispatch, useSelector } from "react-redux";
import {
  getDefinitionError,
  getDefinitions,
  isDefinitionsLoading,
} from "../selectors/exerciseDefinition.selectors";

const sortOptions = [
  { value: SortBy.lastActive, label: "Last Active" },
  { value: SortBy.mostImprovement, label: "Most Improvement" },
  { value: SortBy.numberOfSessions, label: "Number of Sessions" },
];

type Props = StackScreenProps<ExercisesParamList, "ExercisesScreen">;

export default function ExercisesScreen({ navigation }: Props) {
  const dispatch = useDispatch();

  const error = useSelector(getDefinitionError);
  const loading = useSelector(isDefinitionsLoading);
  const definitions = useSelector(getDefinitions);

  const fetchDefinitions = () =>
    dispatch(actions.requestDefinitions.started(undefined));

  useEffect(() => {
    fetchDefinitions();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  const sortBy = useMemo(
    () => sortOptions[selectedIndex.row],
    [selectedIndex.row]
  );
  const sortExercises = useCallback(
    (a, b) => {
      switch (sortBy.value) {
        case SortBy.mostImprovement:
          return sortByImprovement(a, b);
        case SortBy.numberOfSessions:
          return sortByNumberOfSessions(a, b);
        default:
          return sortByDate(a, b);
      }
    },
    [sortBy.value]
  );
  const filterExercises = useCallback(
    (e) => filterBySearchTerm(e, searchTerm),
    [searchTerm]
  );

  const navigateToEdit = useCallback(
    () => navigation.navigate("ExerciseEditScreen", {}),
    []
  );

  return (
    <Background>
      <ErrorToast error={error} />
      <Button
        appearance="outline"
        onPress={navigateToEdit}
        style={styles.addExerciseButton}
        accessoryRight={() => (
          <Icon fill={Colors.orange} name="plus-circle-outline" size="sm" />
        )}
      >
        Create Exercise
      </Button>
      <Input
        style={styles.searchBar}
        placeholder="Search exercises..."
        onChangeText={setSearchTerm}
        value={searchTerm}
        accessoryLeft={(props) => (
          <Icon {...props} size="sm" name="search-outline" />
        )}
      />
      <Select
        label="Select an exercise"
        value={sortBy.label}
        style={styles.picker}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index as IndexPath)}
      >
        {sortOptions.map(({ value, label }) => (
          <SelectItem key={value} title={label} />
        ))}
      </Select>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchDefinitions} />
        }
      >
        {definitions
          ?.sort(sortExercises)
          .filter(filterExercises)
          .map(
            ({
              id,
              title,
              lastSession,
              lastImprovement,
              history,
            }: ExerciseDefinition) => (
              <Card
                style={styles.exerciseItem}
                key={id}
                onPress={() =>
                  navigation.navigate("ExerciseDetailScreen", {
                    definitionId: id,
                  })
                }
              >
                <Text style={styles.exerciseTitle}>{title}</Text>
                <View style={styles.exerciseMeta}>
                  {lastSession && (
                    <Text style={styles.exerciseDate}>
                      {formatRelativeDate(lastSession.date)}
                    </Text>
                  )}
                  {lastImprovement ? (
                    <Text
                      style={[
                        styles.exerciseImprovement,
                        {
                          color:
                            lastImprovement > 0 ? Colors.green : Colors.red,
                        },
                      ]}
                    >
                      {`${lastImprovement > 0 ? "+" : ""}${lastImprovement}%`}
                    </Text>
                  ) : null}
                  <Text style={styles.exerciseImprovement}>
                    {!history || history.length === 0
                      ? "Unattempted!"
                      : `Sessions: ${history.length}`}
                  </Text>
                </View>
              </Card>
            )
          )}
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  addExerciseButton: {
    marginBottom: Margin.md,
  },
  exerciseItem: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    minWidth: "100%",
    marginBottom: Margin.sm,
  },
  exerciseDate: {
    marginRight: Margin.sm,
  },
  exerciseImprovement: {
    marginRight: Margin.sm,
  },
  exerciseMeta: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  exerciseTitle: {
    fontSize: FontSize.heading,
    marginBottom: Margin.sm,
    width: "100%",
  },
  searchBar: {
    marginBottom: Margin.sm,
  },
  picker: {
    marginBottom: Margin.md,
    width: "100%",
  },
});
