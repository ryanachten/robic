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
        exercise: "Benchpress",
        highestNetValue: 1812.5,
        lowestNetValue: 1087.5,
        recentSessions: [
          { date: "07/10/2017", value: 1087.5 },
          { date: "08/10/2017", value: 1450 },
          { date: "09/10/2017", value: 1812.5 }
        ]
      }
    ]
  };

  public render() {
    const { exercises } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <ActivityChart data={exercises} />
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
