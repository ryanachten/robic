import { createStackNavigator } from "react-navigation";
import CreateSession from "../screens/sessions/CreateSession";
import Exercise from "../screens/sessions/Exercise";
import Session from "../screens/sessions/Session";
import Sessions from "../screens/sessions/Sessions";

export default createStackNavigator(
  {
    CreateSession,
    Sessions,
    Session,
    SessionExercise: Exercise
  },
  {
    initialRouteName: "Session",
    initialRouteParams: {
      sessionId: "5c43c89a8b685940f4bfb759",
      sessionTitle: "Test"
    }
    // initialRouteParams: {
    //   exerciseId: "5c43c89a8b685940f4bfb75a",
    //   exerciseTitle: "Benchpress"
    // }
  }
);
