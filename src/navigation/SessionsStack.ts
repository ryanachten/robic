import { createStackNavigator } from 'react-navigation';
import Exercise from '../screens/sessions/Exercise';
import Session from '../screens/sessions/Session';
import Sessions from '../screens/sessions/Sessions';

export default createStackNavigator(
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
    },
  },
);
