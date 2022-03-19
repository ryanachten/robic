import * as React from "react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {
  BottomNavigation,
  BottomNavigationTab,
} from "@ui-kitten/components/ui";
import { Icon } from "../components";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {
  UnauthenticatedParamList,
  LoginParamList,
  RegisterParamList,
} from "./types";

const BottomTab = createBottomTabNavigator<UnauthenticatedParamList>();

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      title="Login"
      icon={(props) => <Icon {...props} name="person-outline" />}
    />
    <BottomNavigationTab
      title="Register"
      icon={(props) => <Icon {...props} name="edit-outline" />}
    />
  </BottomNavigation>
);

export default function UnauthenticatedNavigator() {
  return (
    <BottomTab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      initialRouteName="Login"
    >
      <BottomTab.Screen name="Login" component={LoginNavigator} />
      <BottomTab.Screen name="Register" component={RegisterNavigator} />
    </BottomTab.Navigator>
  );
}

const sharedScreenOptions: StackNavigationOptions = {
  headerTitleAlign: "center",
};

const LoginStack = createStackNavigator<LoginParamList>();

function LoginNavigator() {
  return (
    <LoginStack.Navigator screenOptions={sharedScreenOptions}>
      <LoginStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: "Login" }}
      />
    </LoginStack.Navigator>
  );
}

const RegisterStack = createStackNavigator<RegisterParamList>();

function RegisterNavigator() {
  return (
    <RegisterStack.Navigator screenOptions={sharedScreenOptions}>
      <RegisterStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerTitle: "Register" }}
      />
    </RegisterStack.Navigator>
  );
}
