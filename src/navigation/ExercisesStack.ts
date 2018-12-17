import { createStackNavigator } from 'react-navigation';
import Exercises from '../screens/exercises/Exercises';

export default createStackNavigator(
  {
    Exercises,
  },
  {
    // initialRouteName: 'Exercise',
    // initialRouteParams: {
    //   exerciseId: 'benchpress',
    //   exerciseTitle: 'Benchpress',
    // },
  },
);
