import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";

import { Colors } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
  AuthenticatedParamList,
  HomeParamList,
  ExercisesParamList,
} from "../types";
import HomeScreen from "../screens/HomeScreen";
import ExercisesScreen from "../screens/ExercisesScreen";
import ExerciseDetailScreen from "../screens/ExerciseDetailScreen";
import { LogoutButton } from "../components/LogoutButton";
import ExerciseEditScreen from "../screens/ExerciseEditScreen";

const BottomTab = createBottomTabNavigator<AuthenticatedParamList>();

const sharedScreenOptions = {
  headerRight: () => <LogoutButton />,
};

export default function AuthenticatedNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Start"
      tabBarOptions={{ activeTintColor: Colors.orange }}
    >
      <BottomTab.Screen
        name="Start"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="flash-on" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Exercises"
        component={ExerciseNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="fitness-center" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Activity"
        component={ExerciseNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="equalizer" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Icon size={30} style={{ marginBottom: -3 }} {...props} />;
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
