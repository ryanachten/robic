import * as React from "react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  BottomNavigation,
  BottomNavigationTab,
} from "@ui-kitten/components/ui";
import { Icon } from "../components";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {
  UnauthenticatedParamList,
  LoginParamList,
  RegisterParamList,
} from "../types";

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
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      initialRouteName="Login"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen name="Login" component={LoginNavigator} />
      <BottomTab.Screen name="Register" component={RegisterNavigator} />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const LoginStack = createStackNavigator<LoginParamList>();

function LoginNavigator() {
  return (
    <LoginStack.Navigator>
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
    <RegisterStack.Navigator>
      <RegisterStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerTitle: "Register" }}
      />
    </RegisterStack.Navigator>
  );
}
