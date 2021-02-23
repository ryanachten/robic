import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, View, RefreshControl } from "react-native";
import { Card, List, ListItem, Text } from "@ui-kitten/components";
import { ExercisesParamList } from "../navigation/types";
import { Set, ExerciseDefinition } from "../constants/Interfaces";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Background,
  ExerciseCard,
  ExerciseDetailAnalytics,
  ErrorToast,
  Button,
  Icon,
} from "../components";
import { FontSize, Margin } from "../constants/Sizes";
import { Colors } from "../constants/Colors";
import { ExerciseContext, ExerciseDefintionContext } from "../services/context";
import { ExerciseState } from "../reducers/exercise";
import { formatRelativeDate } from "../utilities/dateHelpers";

type Props = StackScreenProps<ExercisesParamList, "ExerciseDetailScreen">;

export default function ExerciseDetailScreen({ route, navigation }: Props) {
  const definitionId = route.params ? route.params.definitionId : null;

  const {
    state: { definitions, error, loading },
    actions: { getDefinitionById },
  } = useContext(ExerciseDefintionContext);

  const {
    state: exerciseState,
    actions: { getExercisesByDefintion },
  } = useContext(ExerciseContext);

  useEffect(() => {
    if (definitionId) {
      getDefinitionById(definitionId);
      getExercisesByDefintion(definitionId);
    }
  }, []);

  const exercise = definitions.find((def) => def.id === definitionId);

  const navigateToEditScreen = () =>
    navigation.navigate("ExerciseEditScreen", {
      definition: exercise,
    });

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
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => getDefinitionById(exercise ? exercise.id : "")}
          />
        }
      >
        {exercise && (
          <>
            <DefinitionDetail definition={exercise} />
            <ExerciseList {...exerciseState} />
          </>
        )}
      </ScrollView>
      <ErrorToast error={error} />
    </Background>
  );
}

const DefinitionDetail = ({
  definition,
}: {
  definition: ExerciseDefinition;
}) => {
  const {
    type,
    primaryMuscleGroup,
    lastSession,
    lastImprovement,
    personalBest: pb,
  } = definition;

  return (
    <>
      {(lastSession || pb) && (
        <Card style={styles.exerciseCards}>
          {lastSession && (
            <ExerciseCard
              icon="clock-outline"
              containerStyle={styles.exerciseCard}
              title="Latest Exercise"
              exercise={lastSession}
            />
          )}
          {pb && pb.topNetExercise && (
            <ExerciseCard
              icon="star-outline"
              title="Personal Best"
              exercise={pb.topNetExercise}
            />
          )}
        </Card>
      )}
      {pb && (
        <View style={styles.itemWrapper}>
          <Item label="Top Weight (Avg)" value={pb.topAvgValue.toString()} />
          <Item label="Top Reps" value={pb.topReps.toString()} />
          <Item label="Top Sets" value={pb.topSets.toString()} />
        </View>
      )}
      <View style={styles.itemWrapper}>
        {type && <Item label="Type" value={type} />}
        {primaryMuscleGroup && (
          <Item label="Muscles groups" value={primaryMuscleGroup.join(", ")} />
        )}
        {lastImprovement ? (
          <Item label="Last improvement" value={`${lastImprovement}%`} />
        ) : null}
      </View>
      {pb && <ExerciseDetailAnalytics history={pb.history} />}
    </>
  );
};

const ExerciseList = ({ exercises }: ExerciseState) => {
  return (
    <List
      style={styles.container}
      data={exercises.map((e) => {
        return {
          title: formatRelativeDate(e.date),
          sets: e.sets,
        };
      })}
      renderItem={({ item, index }) => (
        <ListItem
          key={index}
          title={item.title}
          description={(props) => {
            const sets: Array<Set> = item.sets;
            return (
              <>
                {sets.map(({ reps, value }, i) => (
                  <Text {...props} key={i}>{`${reps} reps x ${value} kg`}</Text>
                ))}
              </>
            );
          }}
          accessoryRight={() => (
            <Icon size="sm" fill={Colors.orange} name="slash-outline" />
          )}
        />
      )}
    />
  );
};

const Item = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}</Text>
    <Text>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  editButton: {
    marginBottom: Margin.md,
  },
  exerciseCard: {
    marginBottom: Margin.md,
  },
  exerciseCards: {
    marginBottom: Margin.md,
  },
  item: {
    alignItems: "center",
  },
  itemWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Margin.md,
  },
  label: {
    color: Colors.grey,
  },
  title: {
    fontSize: FontSize.heading,
    marginBottom: Margin.md,
  },
});
