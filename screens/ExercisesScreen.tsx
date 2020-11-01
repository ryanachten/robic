import React, { useEffect, useReducer, useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { formatDistance } from "date-fns";
import { Picker } from "native-base";
import { SearchBar } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { Background, Button, Card, ErrorToast, Text } from "../components";
import { ExercisesParamList } from "../types";
import {
  exerciseDefinitionReducer,
  exerciseDefinitionActions,
  initialExerciseDefinitionState,
} from "../reducers/exerciseDefinition";
import { ExerciseDefinition } from "../constants/Interfaces";
import useColorScheme from "../hooks/useColorScheme";
import {
  filterBySearchTerm,
  sortByDate,
  sortByImprovment,
  sortByNumberOfSessions,
} from "../utilities/searchHelpers";
import { FontSize, Margin } from "../constants/Sizes";
import { Colors } from "../constants/Colors";

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
    <Background>
      <SearchBar
        lightTheme={useColorScheme() === "light"}
        containerStyle={styles.searchBar}
        inputContainerStyle={{
          backgroundColor: Colors.white,
        }}
        placeholder="Type Here..."
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <Button
        title="Create exercise"
        onPress={() => navigation.navigate("ExerciseEditScreen")}
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
      <ScrollView>
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
                    <Text style={styles.exerciseImprovement}>
                      {lastImprovement}%
                    </Text>
                  )}
                  <Text style={styles.exerciseImprovement}>
                    Sessions: {history.length}
                  </Text>
                </Card>
              </TouchableOpacity>
            )
          )}
        <ErrorToast error={error} />
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  exerciseItem: {
    marginBottom: Margin.sm,
  },
  exerciseDate: {
    marginLeft: 10,
  },
  exerciseImprovement: {
    marginLeft: 10,
  },
  exerciseTitle: {
    fontSize: FontSize.heading,
    marginBottom: Margin.sm,
    width: "100%",
  },
  searchBar: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    marginBottom: Margin.sm,
    padding: 0,
    width: "100%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
