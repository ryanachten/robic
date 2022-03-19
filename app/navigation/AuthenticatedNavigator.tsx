import React from "react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { StackHeaderLeftButtonProps } from "@react-navigation/stack/lib/typescript/src/types";

import {
  AuthenticatedParamList,
  HomeParamList,
  ExercisesParamList,
  AnalyticsParamList,
  SettingsParamList,
} from "./types";
import HomeScreen from "../screens/HomeScreen";
import ExercisesScreen from "../screens/ExercisesScreen";
import ExerciseDetailScreen from "../screens/ExerciseDetailScreen";
import { BackButton, SettingsButton } from "../components/NavigationButtons";
import ExerciseEditScreen from "../screens/ExerciseEditScreen";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { Icon } from "../components";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import SettingsScreen from "../screens/SettingsScreen";

const BottomTab = createBottomTabNavigator<AuthenticatedParamList>();

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      title="Workout"
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
      tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
    >
      <BottomTab.Screen name="Start" component={HomeNavigator} />
      <BottomTab.Screen name="Exercises" component={ExerciseNavigator} />
      <BottomTab.Screen name="Activity" component={ActivityNavigator} />
    </BottomTab.Navigator>
  );
}

const sharedScreenOptions: StackNavigationOptions = {
  headerRight: () => <SettingsButton />,
  headerLeft: (props: StackHeaderLeftButtonProps) => <BackButton {...props} />,
  headerTitleAlign: "center",
};

const HomeStack = createStackNavigator<HomeParamList>();
const ExercisesStack = createStackNavigator<ExercisesParamList>();
const AnalyticsStack = createStackNavigator<AnalyticsParamList>();
const SettingsStack = createStackNavigator<SettingsParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={sharedScreenOptions}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: "Workout",
        }}
      />
    </HomeStack.Navigator>
  );
}

function ExerciseNavigator() {
  return (
    <ExercisesStack.Navigator screenOptions={sharedScreenOptions}>
      <ExercisesStack.Screen
        name="ExercisesScreen"
        component={ExercisesScreen}
        options={{
          headerTitle: "Exercises",
          headerLeft: () => <></>,
        }}
      />
      <ExercisesStack.Screen
        name="ExerciseDetailScreen"
        component={ExerciseDetailScreen}
        options={{
          headerTitle: "Exercise",
          headerLeft: (props: StackHeaderLeftButtonProps) => (
            <BackButton
              {...props}
              label="Exercises"
              backScreenName="ExercisesScreen"
            />
          ),
        }}
      />
      <ExercisesStack.Screen
        name="ExerciseEditScreen"
        component={ExerciseEditScreen}
        options={{
          headerTitle: "Edit Exercise",
          headerLeft: (props: StackHeaderLeftButtonProps) => (
            <BackButton
              {...props}
              label="Exercises"
              backScreenName="ExercisesScreen"
            />
          ),
        }}
      />
    </ExercisesStack.Navigator>
  );
}

function ActivityNavigator() {
  return (
    <AnalyticsStack.Navigator screenOptions={sharedScreenOptions}>
      <AnalyticsStack.Screen
        name="AnalyticsScreen"
        component={AnalyticsScreen}
        options={{
          headerTitle: "Activity",
        }}
      />
    </AnalyticsStack.Navigator>
  );
}

export function SettingsNavigator() {
  return (
    <AnalyticsStack.Navigator
      screenOptions={{
        ...sharedScreenOptions,
        headerRight: undefined,
        headerLeft: (props: StackHeaderLeftButtonProps) => (
          <BackButton {...props} label="Back" />
        ),
      }}
    >
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerTitle: "Settings",
        }}
      />
    </AnalyticsStack.Navigator>
  );
}
