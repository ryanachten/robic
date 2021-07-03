import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "./types";
import UnauthenticatedNavigator from "./UnauthenticatedNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import AuthenticatedNavigator, {
  SettingsNavigator,
} from "./AuthenticatedNavigator";
import { useEffect, useReducer, useMemo } from "react";
import { userReducer, userActions, initialUserState } from "../reducers/user";
import {
  UserContext,
  AuthContext,
  ExerciseDefinitionContext,
  AnalyticsContext,
  ExerciseContext,
} from "../services/context";
import { authReducer, authActions, initialAuthState } from "../reducers/auth";
import {
  exerciseDefinitionActions,
  exerciseDefinitionReducer,
  initialExerciseDefinitionState,
} from "../reducers/exerciseDefinition";
import {
  analyticsActions,
  analyticsReducer,
  initialAnalyticsState,
} from "../reducers/analytics";
import {
  exerciseActions,
  exerciseReducer,
  initialExerciseState,
} from "../reducers/exercise";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [user, userDispatch] = useReducer(userReducer, initialUserState);
  const [auth, authDispatch] = useReducer(authReducer, initialAuthState);
  const [exerciseDefinition, exerciseDefinitionDispatch] = useReducer(
    exerciseDefinitionReducer,
    initialExerciseDefinitionState
  );
  const [exercises, exerciseDispatch] = useReducer(
    exerciseReducer,
    initialExerciseState
  );
  const [analytics, analyticsDispatch] = useReducer(
    analyticsReducer,
    initialAnalyticsState
  );

  const userContext = useMemo(() => userActions(userDispatch), []);
  const authContext = useMemo(
    () => authActions(authDispatch, userDispatch),
    []
  );
  const exerciseContext = useMemo(() => exerciseActions(exerciseDispatch), []);
  const exerciseDefinitionContext = useMemo(
    () => exerciseDefinitionActions(exerciseDefinitionDispatch),
    []
  );
  const analyticsContext = useMemo(
    () => analyticsActions(analyticsDispatch),
    []
  );

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    await authContext.restoreToken();
    await userContext.restoreUser();
  };

  return (
    <AuthContext.Provider value={{ state: auth, actions: authContext }}>
      <UserContext.Provider value={{ state: user, actions: userContext }}>
        {auth.token ? (
          <ExerciseDefinitionContext.Provider
            value={{
              state: exerciseDefinition,
              actions: exerciseDefinitionContext,
            }}
          >
            <ExerciseContext.Provider
              value={{
                state: exercises,
                actions: exerciseContext,
              }}
            >
              <AnalyticsContext.Provider
                value={{
                  state: analytics,
                  actions: analyticsContext,
                }}
              >
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen
                    name="Root"
                    component={AuthenticatedNavigator}
                  />
                  <Stack.Screen name="Settings" component={SettingsNavigator} />
                  <Stack.Screen
                    name="NotFound"
                    component={NotFoundScreen}
                    options={{ title: "Oops!" }}
                  />
                </Stack.Navigator>
              </AnalyticsContext.Provider>
            </ExerciseContext.Provider>
          </ExerciseDefinitionContext.Provider>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={UnauthenticatedNavigator} />
            <Stack.Screen
              name="NotFound"
              component={NotFoundScreen}
              options={{ title: "Oops!" }}
            />
          </Stack.Navigator>
        )}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}
