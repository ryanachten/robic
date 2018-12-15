import * as React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-elements';

export default () => (
  <View>
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
