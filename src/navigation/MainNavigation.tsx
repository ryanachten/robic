import * as React from 'react';
import { Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createNavigationContainer,
  createStackNavigator,
} from 'react-navigation';
import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';
import Session from '../screens/Session';
import Sessions from '../screens/Sessions';

class StubScreen extends React.Component {
  public render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Placeholder screen</Text>
      </View>
    );
  }
}

const ActivityStack = createStackNavigator(
  {
    Activity: Dashboard,
  },
  {
    initialRouteName: 'Activity',
  },
);

const SessionStack = createStackNavigator(
  {
    Session,
    Sessions,
  },
  {
    initialRouteName: 'Sessions',
  },
);

const MainNavigator = createBottomTabNavigator(
  {
    Activity: ActivityStack,
    Sessions: SessionStack,
    Settings: StubScreen,
  },
  {
    initialRouteName: 'Sessions',
  },
);

export default MainNavigator;
