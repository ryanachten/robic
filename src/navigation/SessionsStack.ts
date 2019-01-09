import { createStackNavigator } from "react-navigation";
import Exercise from "../screens/sessions/Exercise";
import Session from "../screens/sessions/Session";
import Sessions from "../screens/sessions/Sessions";

export default createStackNavigator(
  {
    Sessions,
    Session,
    SessionExercise: Exercise
  },
  {
    initialRouteName: "Sessions"
    // initialRouteName: 'SessionExercise',
    // initialRouteParams: {
    //   exerciseId: 'benchpress',
    //   exerciseTitle: 'Benchpress',
    // },
  }
);
