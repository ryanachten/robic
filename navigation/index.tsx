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
import { useDispatch, useSelector } from "react-redux";
import { requestRestoreToken, requestRestoreUser } from "../actions";
import { getToken, isRestoreTokenLoading } from "../selectors/auth.selectors";

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

  const authLoading = useSelector(isRestoreTokenLoading);
  const token = useSelector(getToken);

  const [, userDispatch] = useReducer(userReducer, initialUserState);
  const [auth, authDispatch] = useReducer(authReducer, initialAuthState);

  const restoreToken = () => dispatch(requestRestoreToken.started(undefined));
  const restoreUser = () => dispatch(requestRestoreUser.started(undefined));

  const authContext = useMemo(
    () => authActions(authDispatch, userDispatch),
    []
  );

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    restoreToken();
    restoreUser();
  };

  if (authLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ state: auth, actions: authContext }}>
      {token ? (
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
