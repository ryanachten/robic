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
      sessionId: "5c3c2b07a45a34fd7915c58b",
      sessionTitle: "Arms"
    }
  }
);
