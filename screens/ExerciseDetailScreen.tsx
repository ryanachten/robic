import React, { useContext, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
} from "react-native";
import { Text } from "../components/Themed";
import { ExercisesParamList } from "../navigation/types";
import { ExerciseDefinition } from "../constants/Interfaces";
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
import { ExerciseDefintionContext } from "../services/context";

type Props = StackScreenProps<ExercisesParamList, "ExerciseDetailScreen">;

export default function ExerciseDetailScreen({ route, navigation }: Props) {
  const definitionId = route.params ? route.params.definitionId : null;

  const {
    state: { definitions, error, loading },
    actions: { getDefinitionById },
  } = useContext(ExerciseDefintionContext);

  useEffect(() => {
    definitionId && getDefinitionById(definitionId);
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
        accessoryRight={() => (
          <Icon fill={Colors.orange} name="edit-outline" size="sm" />
        )}
      >
        Edit
      </Button>
      {exercise && (
        <DefinitionDetail
          loading={loading}
          definition={exercise}
          getDefinitionById={getDefinitionById}
        />
      )}
      <ErrorToast error={error} />
    </Background>
  );
}

const DefinitionDetail = ({
  definition,
  loading,
  getDefinitionById,
}: {
  definition: ExerciseDefinition;
  getDefinitionById: (id: string) => Promise<void>;
  loading: boolean;
}) => {
  const {
    id,
    type,
    primaryMuscleGroup,
    lastSession,
    lastImprovement,
    personalBest: pb,
  } = definition;

  const getDefinition = () => getDefinitionById(id);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getDefinition} />
      }
    >
      {lastSession && (
        <ExerciseCard
          icon="clock-outline"
          containerStyle={styles.exerciseCard}
          title="Latest Exercise"
          exercise={lastSession}
        />
      )}
      {pb && (
        <View>
          {pb.topNetExercise && (
            <ExerciseCard
            icon="star-outline"
            title="Personal Best"
            exercise={pb.topNetExercise}
            containerStyle={styles.exerciseCard}
          />
          )}
          <View style={styles.itemWrapper}>
            <Item label="Top Weight (Avg)" value={pb.topAvgValue.toString()} />
            <Item label="Top Reps" value={pb.topReps.toString()} />
            <Item label="Top Sets" value={pb.topSets.toString()} />
          </View>
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
    </ScrollView>
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
  exerciseCard: {
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
