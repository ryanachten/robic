import moment from "moment";
import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-elements";

export class SessionCard extends React.Component {
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
    const { title, date, excerciseCount, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <Card>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.textWrapper}>
            <Text style={styles.textLabel}>Last active: </Text>
            {this.renderDate()}
          </Text>
          <Text style={styles.textWrapper}>
            <Text style={styles.textLabel}>Number of exercises: </Text>
            <Text>{excerciseCount}</Text>
          </Text>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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
