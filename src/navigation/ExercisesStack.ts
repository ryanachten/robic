import { createStackNavigator } from "react-navigation";
import Exercise from "../screens/exercises/Exercise";
import Exercises from "../screens/exercises/Exercises";

export default createStackNavigator(
  {
    ExerciseRecord: Exercise,
    Exercises
  },
  {
    initialRouteName: "Exercises"
    // initialRouteParams: {
    //   exerciseId: "benchpress",
    //   exerciseTitle: "Benchpress"
    // }
  }
);
