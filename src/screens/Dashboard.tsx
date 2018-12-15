import * as React from 'react';
import { ScrollView } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { ScreenHeader } from '../components';

class Dashboard extends React.Component {

  public render() {
    return (
      <ScrollView>
        <ScreenHeader>Activity</ScreenHeader>
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
