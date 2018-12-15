import * as React from 'react';
import { Text, View } from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';

class StubScreen extends React.Component {
  public render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Placeholder screen</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Activity: Dashboard,
  Sessions: StubScreen,
  Settings: StubScreen,
});

const stack = createStackNavigator({
  // auth: Login,
  main: {
    navigationOptions: { title: 'Robic' },
    screen: TabNavigator,
  },
});

export default createAppContainer(stack);
