import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { ScreenHeader } from '../components';

class Dashboard extends React.Component {

  public static navigationOptions = {
    title: 'Activity',
  };

  public render() {

    const data = [
      { quarter: 1, earnings: 13000 },
      { quarter: 2, earnings: 16500 },
      { quarter: 3, earnings: 14250 },
      { quarter: 4, earnings: 19000 }
    ];

    return (
      <ScrollView>
        <View style={styles.container}>
          <VictoryChart width={350} theme={VictoryTheme.material}>
            <VictoryBar data={data} x="quarter" y="earnings" />
          </VictoryChart>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
