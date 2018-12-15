import * as React from 'react';
import { Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createNavigationContainer,
  createStackNavigator,
} from 'react-navigation';
import Dashboard from '../screens/Dashboard';
import Exercise from '../screens/Exercise';
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
    Exercise,
    Session,
    Sessions,
  },
  {
    // initialRouteName: 'Sessions',
    initialRouteName: 'Exercise',
    initialRouteParams: {
      exerciseId: 'benchpress',
      exerciseTitle: 'Benchpress',
    }
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
