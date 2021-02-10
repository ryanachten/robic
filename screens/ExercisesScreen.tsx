import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, RefreshControl, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { formatDistance } from "date-fns";
import { StackScreenProps } from "@react-navigation/stack";
import { Background, Button, ErrorToast, Icon } from "../components";
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
  Card,
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
      <Button
        appearance="outline"
        onPress={() => navigation.navigate("ExerciseEditScreen", {})}
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
          <RefreshControl refreshing={loading} onRefresh={getDefinitions} />
        }
      >
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
                      {`${formatDistance(
                        new Date(lastSession.date),
                        Date.now()
                      )} ago`}
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
