import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { ActivityChart, ScreenHeader } from "../components";

class Dashboard extends React.Component {
  public static navigationOptions = {
    title: "Activity"
  };

  public state = {
    exercises: [
      {
        title: "Benchpress",
        highestNetValue: 72.5 * 5 * 5,
        recentSessions: [
          { date: new Date(2018, 11, 29), value: 70 * 5 * 5 },
          { date: new Date(2018, 12, 6), value: 72.5 * 3 * 5 },
          { date: new Date(2018, 12, 13), value: 72.5 * 4 * 5 },
          { date: new Date(2018, 12, 20), value: 72.5 * 5 * 5 }
        ]
      },
      {
        title: "Incline Butterfly",
        highestNetValue: 22 * 8 * 4,
        recentSessions: [
          { date: new Date(2018, 11, 29), value: 20 * 8 * 4 },
          { date: new Date(2018, 12, 6), value: 22 * 6 * 4 },
          { date: new Date(2018, 12, 13), value: 22 * 7 * 4 },
          { date: new Date(2018, 12, 20), value: 22 * 8 * 4 }
        ]
      },
      {
        title: "Z-Curl",
        highestNetValue: 14 * 10 * 4,
        recentSessions: [
          { date: new Date(2018, 11, 29), value: 10 * 10 * 4 },
          { date: new Date(2018, 12, 6), value: 12 * 10 * 4 },
          { date: new Date(2018, 12, 13), value: 12 * 10 * 4 },
          { date: new Date(2018, 12, 20), value: 14 * 10 * 4 }
        ]
      }
    ]
  };

  public render() {
    const { exercises } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <ActivityChart exercises={exercises} />
        </View>
        <Card>
          <Text>Stats</Text>
          <Text>Some line graph providing an overview of growth</Text>
          <Text>Exercise with most growth</Text>
          <Text>Exercise with least growth</Text>
        </Card>
        <Card>
          <Text>Recent session stats</Text>
          <Text>Some line graph providing an overview of growth</Text>
          <Text>Recent PB's</Text>
          <Text>Areas of focus</Text>
        </Card>
      </ScrollView>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});
