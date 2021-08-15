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
import { userReducer, initialUserState } from "../reducers/user";
import { AuthContext } from "../services/context";
import { authReducer, authActions, initialAuthState } from "../reducers/auth";
import LoadingScreen from "../screens/LoadingScreen";
import { useDispatch } from "react-redux";
import { requestRestoreUser } from "../actions";

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
  const dispatch = useDispatch();
  const [user, userDispatch] = useReducer(userReducer, initialUserState);
  const [auth, authDispatch] = useReducer(authReducer, initialAuthState);

  const restoreUser = () => dispatch(requestRestoreUser.started(undefined));

  const authContext = useMemo(
    () => authActions(authDispatch, userDispatch),
    []
  );

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    await authContext.restoreToken();
    restoreUser();
  };

  if (auth.loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ state: auth, actions: authContext }}>
      {auth.token ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={AuthenticatedNavigator} />
          <Stack.Screen name="Settings" component={SettingsNavigator} />
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
    </AuthContext.Provider>
  );
}
