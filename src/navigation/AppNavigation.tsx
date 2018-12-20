import * as React from "react";
import {
  createNavigationContainer,
  createStackNavigator
} from "react-navigation";
import Login from "../screens/Login";
import MainNavigation from "./MainNavigation";

const stack = createStackNavigator(
  {
    auth: Login,
    main: MainNavigation
  },
  {
    headerMode: "none",
    initialRouteName: "main"
  }
);

const AppContainer = createNavigationContainer(stack);

export default AppContainer;
