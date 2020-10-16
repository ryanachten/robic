import React, { useEffect, useReducer, useState } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { formatDistance } from "date-fns";
import { Picker } from "native-base";
import { Button, SearchBar } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { Text } from "../components/Themed";
import { ExercisesParamList } from "../types";
import {
  exerciseDefinitionReducer,
  exerciseDefinitionActions,
  initialExerciseDefinitionState,
} from "../reducers/exerciseDefinition";
import { ExerciseDefinition } from "../constants/Interfaces";
import { ErrorToast } from "../components/ErrorToast";
import useColorScheme from "../hooks/useColorScheme";
import {
  filterBySearchTerm,
  sortByDate,
  sortByImprovment,
  sortByNumberOfSessions,
} from "../utilities/searchHelpers";

enum SortBy {
  lastActive = "lastActive",
  lastImprovement = "lastImprovement",
  numberOfSessions = "numberOfSessions",
}

type Props = StackScreenProps<ExercisesParamList, "ExercisesScreen">;

export default function ExercisesScreen({ navigation }: Props) {
  const [{ definitions, error, loading }, definitionDispatch] = useReducer(
    exerciseDefinitionReducer,
    initialExerciseDefinitionState
  );

  useEffect(() => {
    exerciseDefinitionActions(definitionDispatch).getDefinitions();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.lastActive);

  return (
    <View style={styles.container}>
      <Button
        title="Create exercise"
        onPress={() => navigation.navigate("ExerciseEditScreen")}
      />
      <SearchBar
        lightTheme={useColorScheme() === "light"}
        containerStyle={styles.searchBar}
        placeholder="Type Here..."
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <Picker note selectedValue={sortBy} onValueChange={setSortBy}>
        <Picker.Item label="Last active" value={SortBy.lastActive} />
        <Picker.Item label="Most improved" value={SortBy.lastImprovement} />
        <Picker.Item
          label="Number of sessions"
          value={SortBy.numberOfSessions}
        />
      </Picker>
      {loading && <ActivityIndicator size="large" />}
      <ScrollView contentContainerStyle={styles.container}>
        {definitions
          ?.sort((a, b) => {
            switch (sortBy) {
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
              lastActive,
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
                <Text>{title}</Text>
                {lastActive && (
                  <Text style={styles.exerciseDate}>
                    {`${formatDistance(new Date(lastActive), Date.now())} ago`}
                  </Text>
                )}
                {lastImprovement && (
                  <Text style={styles.exerciseImprovement}>
                    {lastImprovement}%
                  </Text>
                )}
                <Text style={styles.exerciseImprovement}>
                  Sessions: {history.length}
                </Text>
              </TouchableOpacity>
            )
          )}
        <ErrorToast error={error} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  exerciseDate: {
    marginLeft: 10,
  },
  exerciseImprovement: {
    marginLeft: 10,
  },
  searchBar: {
    width: "100%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
