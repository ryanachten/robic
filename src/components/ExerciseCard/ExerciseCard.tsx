import moment from "moment";
import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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
    const { personalBest, unit } = this.props;
    if (!personalBest) return null;

    const { value, totalReps, setCount, netValue, timeTaken } = personalBest;
    const reps = totalReps.value;
    const sets = setCount.value;
    const netWeight = netValue.value;
    const maxWeight = value.value;
    const maxTimeTaken = timeTaken.value;
    return (
      <View>
        <Text style={styles.textLabel}>Personal bests: </Text>
        <Text style={styles.textWrapper}>
          <Text style={styles.text}>{`${maxWeight}${unit} max weight`}</Text>
          <Text style={styles.text}>{` | ${reps} total ${
            reps === 1 ? "rep" : "reps"
          }`}</Text>
          <Text style={styles.text}>{` | ${sets} ${
            sets === 1 ? "set" : "sets"
          }`}</Text>
          <Text style={styles.text}>{` | ${netWeight}${unit} net weight`}</Text>
          <Text style={styles.text}>{` | ${maxTimeTaken}min time taken`}</Text>
        </Text>
      </View>
    );
  }

  public renderDate() {
    const lastActive = this.props.lastActive;
    if (lastActive === null) {
      return <Text>Not yet attempted</Text>;
    }
    const daysElapsed = moment().diff(moment(lastActive), "days");
    return (
      <Text>{`${daysElapsed} ${daysElapsed === 1 ? "day" : "days"} ago`}</Text>
    );
  }

  public render() {
    const { title, onPress, lastActive } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <Card>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.textWrapper}>
            <Text style={styles.textLabel}>Last active: </Text>
            {this.renderDate()}
          </Text>
          {!lastActive === null && this.renderLastSession()}
          {!lastActive === null && this.renderPersonalBest()}
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
    marginRight: 20,
    fontSize: 12,
    textAlign: "center"
  },
  textWrapper: {
    fontSize: 12,
    textAlign: "center"
  },
  text: {
    fontSize: 12,
    textAlign: "center"
  },
  title: {
    marginBottom: 10,
    textAlign: "center"
  }
});
