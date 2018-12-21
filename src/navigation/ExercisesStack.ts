import { createStackNavigator } from "react-navigation";
import Exercise from "../screens/exercises/Exercise";
import Exercises from "../screens/exercises/Exercises";

export default createStackNavigator(
  {
    Exercise,
    Exercises
  },
  {
    initialRouteName: "Exercise",
    initialRouteParams: {
      exerciseId: "benchpress",
      exerciseTitle: "Benchpress"
    }
  }
);
