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
import AuthenticatedNavigator from "./AuthenticatedNavigator";
import { useEffect, useReducer, useMemo } from "react";
import LoadingScreen from "../screens/LoadingScreen";
import { userReducer, userActions } from "../reducers/user";
import {
  UserContext,
  AuthContext,
  ExerciseDefintionContext,
} from "../services/context";
import { authReducer, authActions, initialAuthState } from "../reducers/auth";
import {
  exerciseDefinitionActions,
  exerciseDefinitionReducer,
  initialExerciseDefinitionState,
} from "../reducers/exerciseDefinition";

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
  const [user, userDispatch] = useReducer(userReducer, {});
  const [auth, authDispatch] = useReducer(authReducer, initialAuthState);
  const [exerciseDefinition, exerciseDefinitionDispatch] = useReducer(
    exerciseDefinitionReducer,
    initialExerciseDefinitionState
  );

  const userContext = useMemo(() => userActions(userDispatch), []);
  const authContext = useMemo(
    () => authActions(authDispatch, userDispatch),
    []
  );
  const exerciseDefintionContext = useMemo(
    () => exerciseDefinitionActions(exerciseDefinitionDispatch),
    []
  );

  useEffect(() => {
    authContext.restoreToken();
    userContext.restoreUser();
  }, []);

  if (auth.loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ state: auth, actions: authContext }}>
      <UserContext.Provider value={{ state: user, actions: userContext }}>
        <ExerciseDefintionContext.Provider
          value={{
            state: exerciseDefinition,
            actions: exerciseDefintionContext,
          }}
        >
          {auth.token ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Root" component={AuthenticatedNavigator} />
              <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: "Oops!" }}
              />
            </Stack.Navigator>
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
        </ExerciseDefintionContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}
