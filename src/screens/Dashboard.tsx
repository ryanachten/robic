import * as React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-elements';

class Dashboard extends React.Component {

  public static navigationOptions = {
    title: 'Acitvity',
  };

  public render() {
    return (
      <View>
        <Text>Activity</Text>
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
      </View>
    );
  }
}

export default Dashboard;
