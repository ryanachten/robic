import { createStackNavigator } from 'react-navigation';
import Exercise from '../screens/sessions/Exercise';
import Session from '../screens/sessions/Session';
import Sessions from '../screens/sessions/Sessions';

export default createStackNavigator(
  {
    SessionExercise: Exercise,
    Session,
    Sessions,
  },
  {
    initialRouteName: 'Sessions',
    // initialRouteName: 'SessionExercise',
    // initialRouteParams: {
    //   exerciseId: 'benchpress',
    //   exerciseTitle: 'Benchpress',
    // },
  },
);
