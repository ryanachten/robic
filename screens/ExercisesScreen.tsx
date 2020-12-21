import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { formatDistance } from "date-fns";
import { StackScreenProps } from "@react-navigation/stack";
import { Background, Card, ErrorToast, Fab, Icon } from "../components";
import { ExercisesParamList } from "../navigation/types";
import { ExerciseDefinition } from "../constants/Interfaces";
import {
  filterBySearchTerm,
  sortByDate,
  sortByImprovment,
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
} from "@ui-kitten/components";
import { ExerciseDefintionContext } from "../services/context";

enum SortBy {
  lastActive = "lastActive",
  lastImprovement = "lastImprovement",
  numberOfSessions = "numberOfSessions",
}

const sortOptions = [
  { value: SortBy.lastActive, label: "Last Active" },
  { value: SortBy.lastImprovement, label: "Last Improvement" },
  { value: SortBy.numberOfSessions, label: "Number of Sessions" },
];

type Props = StackScreenProps<ExercisesParamList, "ExercisesScreen">;

export default function ExercisesScreen({ navigation }: Props) {
  const {
    state: { definitions, error, loading },
    actions: { getDefinitions },
  } = useContext(ExerciseDefintionContext);

  useEffect(() => {
    getDefinitions();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  const sortBy = sortOptions[selectedIndex.row];

  return (
    <Background>
      <ErrorToast error={error} />
      <Fab
        containerStyles={styles.addExerciseButton}
        label="Create exercise"
        icon="plus-circle-outline"
        onPress={() => navigation.navigate("ExerciseEditScreen", {})}
      />
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
      {loading && <ActivityIndicator size="large" />}
      <ScrollView>
        {definitions
          ?.sort((a, b) => {
            switch (sortBy.value) {
              case SortBy.lastImprovement:
                return sortByImprovment(a, b);
              case SortBy.numberOfSessions:
                return sortByNumberOfSessions(a, b);
              default:
                return sortByDate(a, b);
            }
          })
          .filter((e) => filterBySearchTerm(e, searchTerm))
          .map(
            ({
              id,
              title,
              lastSession,
              lastImprovement,
              history,
            }: ExerciseDefinition) => (
              <TouchableOpacity
                key={id}
                style={styles.exerciseItem}
                onPress={() =>
                  navigation.navigate("ExerciseDetailScreen", {
                    definitionId: id,
                  })
                }
              >
                <Card>
                  <Text style={styles.exerciseTitle}>{title}</Text>
                  {lastSession && (
                    <Text style={styles.exerciseDate}>
                      {`${formatDistance(
                        new Date(lastSession.date),
                        Date.now()
                      )} ago`}
                    </Text>
                  )}
                  {lastImprovement && (
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
                  )}
                  <Text style={styles.exerciseImprovement}>
                    {!history || history.length === 0
                      ? "Unattempted!"
                      : `Sessions: ${history.length}`}
                  </Text>
                </Card>
              </TouchableOpacity>
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
    marginBottom: Margin.sm,
  },
  exerciseDate: {
    marginRight: Margin.sm,
  },
  exerciseImprovement: {
    marginRight: Margin.sm,
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
