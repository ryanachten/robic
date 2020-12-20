import React from "react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackHeaderLeftButtonProps,
} from "@react-navigation/stack";

import {
  AuthenticatedParamList,
  HomeParamList,
  ExercisesParamList,
} from "./types";
import HomeScreen from "../screens/HomeScreen";
import ExercisesScreen from "../screens/ExercisesScreen";
import ExerciseDetailScreen from "../screens/ExerciseDetailScreen";
import { BackButton, LogoutButton } from "../components/NavigationButtons";
import ExerciseEditScreen from "../screens/ExerciseEditScreen";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { Icon } from "../components";

const BottomTab = createBottomTabNavigator<AuthenticatedParamList>();

const sharedScreenOptions = {
  headerRight: () => <LogoutButton />,
  headerLeft: (props: StackHeaderLeftButtonProps) => <BackButton {...props} />,
};

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      title="Home"
      icon={(props) => <Icon {...props} name="flash-outline" />}
    />
    <BottomNavigationTab
      title="Exercises"
      icon={(props) => <Icon {...props} name="layers-outline" />}
    />
    <BottomNavigationTab
      title="Activity"
      icon={(props) => <Icon {...props} name="activity-outline" />}
    />
  </BottomNavigation>
);

export default function AuthenticatedNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Start"
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <BottomTab.Screen name="Start" component={HomeNavigator} />
      <BottomTab.Screen name="Exercises" component={ExerciseNavigator} />
      <BottomTab.Screen name="Activity" component={ExerciseNavigator} />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();
const ExercisesStack = createStackNavigator<ExercisesParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          ...sharedScreenOptions,
          headerTitle: "Home",
        }}
      />
    </HomeStack.Navigator>
  );
}

function ExerciseNavigator() {
  return (
    <ExercisesStack.Navigator>
      <ExercisesStack.Screen
        name="ExercisesScreen"
        component={ExercisesScreen}
        options={{
          ...sharedScreenOptions,
          headerTitle: "Exercises",
        }}
      />
      <ExercisesStack.Screen
        name="ExerciseDetailScreen"
        component={ExerciseDetailScreen}
        options={{
          ...sharedScreenOptions,
          headerTitle: "Exercise Detail",
        }}
      />
      <ExercisesStack.Screen
        name="ExerciseEditScreen"
        component={ExerciseEditScreen}
        options={{
          ...sharedScreenOptions,
          headerTitle: "Edit Exercise",
        }}
      />
    </ExercisesStack.Navigator>
  );
}
