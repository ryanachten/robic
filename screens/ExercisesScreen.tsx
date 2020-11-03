import React, { useEffect, useReducer, useState } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { formatDistance } from "date-fns";
import { Picker } from "native-base";
import { SearchBar } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { Background, Card, ErrorToast, Fab, Text } from "../components";
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
      <Fab
        containerStyles={styles.addExerciseButton}
        label="Create exercise"
        icon="add"
        onPress={() => navigation.navigate("ExerciseEditScreen")}
      />
      <SearchBar
        lightTheme={useColorScheme() === "light"}
        containerStyle={styles.searchBar}
        inputContainerStyle={{
          backgroundColor: Colors.white,
        }}
        placeholder="Search exercises..."
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <View style={styles.pickerWrapper}>
        <Text>Sort by:</Text>
        <Picker
          note
          selectedValue={sortBy}
          onValueChange={setSortBy}
          headerBackButtonTextStyle={{ color: Colors.orange }}
        >
          <Picker.Item label="Last active" value={SortBy.lastActive} />
          <Picker.Item label="Most improved" value={SortBy.lastImprovement} />
          <Picker.Item
            label="Number of sessions"
            value={SortBy.numberOfSessions}
          />
        </Picker>
      </View>
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
                    {history.length === 0
                      ? "Unattempted!"
                      : `Sessions: ${history.length}`}
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
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    marginBottom: Margin.sm,
    padding: 0,
    width: "100%",
  },
  pickerWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
});
