import * as React from 'react';
import { Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createNavigationContainer,
  createStackNavigator,
} from 'react-navigation';
import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';
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

const MainNavigator = createBottomTabNavigator(
  {
    Activity: Dashboard,
    Sessions,
    Settings: StubScreen,
  },
  {
    initialRouteName: 'Sessions',
  },
);

const stack = createStackNavigator(
  {
    auth: Login,
    main: {
      navigationOptions: { title: 'Robic' },
      screen: MainNavigator,
    },
  },
  {
    initialRouteName: 'main',
  },
);

export default createNavigationContainer(stack);
