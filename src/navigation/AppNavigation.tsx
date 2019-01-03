import * as React from "react";
import {
  createNavigationContainer,
  createStackNavigator
} from "react-navigation";
import Login from "../screens/auth/Login";
import MainNavigation from "./MainNavigation";

const AuthNavigation = createStackNavigator(
  {
    Login
  },
  {
    initialRouteName: "Login"
  }
);

const stack = createStackNavigator(
  {
    auth: AuthNavigation,
    main: MainNavigation
  },
  {
    headerMode: "none",
    initialRouteName: "auth"
  }
);

const AppContainer = createNavigationContainer(stack);

export default AppContainer;
