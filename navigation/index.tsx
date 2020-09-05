import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, AsyncStorage } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import UnauthenticatedNavigator from './UnauthenticatedNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import { getItem } from '../services/storage';
import { useState, useEffect, useReducer, useMemo } from 'react';
import LoadingScreen from '../screens/LoadingScreen';
import { userReducer } from '../reducers/user';
import { UserContext, AuthContext } from '../services/context';
import { authTypes, authReducer } from '../reducers/auth';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [user, userDispatch] = useReducer(userReducer, null);

  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    token: null,
  });

  const authContext = useMemo(
    () => ({
      signIn: async (email: string, password: string) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: authTypes.SIGN_IN, token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: authTypes.SIGN_OUT }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: authTypes.SIGN_IN, token: 'dummy-auth-token' });
      },
    }),
    []
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: authTypes.RESTORE_TOKEN, token: userToken });
    };

    bootstrapAsync();
  }, []);

  console.log('state.token ', state.token);

  return (
    <AuthContext.Provider value={authContext}>
      <UserContext.Provider value={{ user, userDispatch }}>
        {state.token ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={AuthenticatedNavigator} />
            <Stack.Screen
              name="NotFound"
              component={NotFoundScreen}
              options={{ title: 'Oops!' }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={UnauthenticatedNavigator} />
            <Stack.Screen
              name="NotFound"
              component={NotFoundScreen}
              options={{ title: 'Oops!' }}
            />
          </Stack.Navigator>
        )}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}
