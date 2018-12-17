import * as React from 'react';
import { Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createNavigationContainer,
  createStackNavigator,
} from 'react-navigation';
import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';
import ExercisesStack from './ExercisesStack';
import SessionsStack from './SessionsStack';

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

const MainNavigator = createBottomTabNavigator(
  {
    Activity: ActivityStack,
    Sessions: SessionsStack,
    Exercises: ExercisesStack,
  },
  {
    initialRouteName: 'Sessions',
  },
);

export default MainNavigator;
