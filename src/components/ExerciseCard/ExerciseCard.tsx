import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-elements";

interface IProps {
  date: string;
  lastWeightChange?: object;
  personalBest?: object;
  title: string;
}

export class ExerciseCard extends React.Component {
  public renderLastSession() {
    // Delta = net weight amount changed, sign = 'positive' / 'negative'
    const lastWeightChange = this.props.lastWeightChange;
    if (!lastWeightChange) return null;

    const { delta, sign, unit } = lastWeightChange;
    return (
      <Text style={styles.textWrapper}>
        <Text style={styles.textLabel}>Last session: </Text>
        {sign === "positive" && (
          <Text style={styles.positiveChange}>
            +{delta}
            {unit}
          </Text>
        )}
        {sign === "negative" && (
          <Text style={styles.negativeChange}>
            -{delta}
            {unit}
          </Text>
        )}
        {sign === "noChange" && <Text style={styles.noChange}>No Change</Text>}
      </Text>
    );
  }

  public renderPersonalBest() {
    const personalBest = this.props.personalBest;
    if (!personalBest) return null;

    const { reps, value, unit } = personalBest;
    return (
      <Text style={styles.textWrapper}>
        <Text style={styles.textLabel}>Personal best: </Text>
        <Text>
          {value}
          {unit}{" "}
        </Text>
        {reps && <Text>{`${reps} ${reps === 1 ? "rep" : "reps"}`}</Text>}
      </Text>
    );
  }

  public render() {
    const { title, lastActive, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <Card>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.textWrapper}>
            <Text style={styles.textLabel}>Last active: </Text>
            <Text>{lastActive}</Text>
          </Text>
          {this.renderLastSession()}
          {this.renderPersonalBest()}
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  positiveChange: {
    color: "green"
  },
  negativeChange: {
    color: "red"
  },
  noChange: {
    color: "orange"
  },
  textLabel: {
    fontWeight: "bold",
    marginRight: 20
  },
  textWrapper: {
    fontSize: 12,
    textAlign: "center"
  },
  title: {
    marginBottom: 10,
    textAlign: "center"
  }
});
