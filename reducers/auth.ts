import { AxiosResponse } from 'axios';
import { User } from '../constants/Interfaces';
import { Axios } from '../constants/Api';
import { AsyncStorage } from 'react-native';

export enum authTypes {
  RESTORE_TOKEN = 'RESTORE_TOKEN',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  ERROR = 'AUTH_ERROR',
}

export type AuthState = {
  isLoading: boolean;
  isSignout: boolean;
  token: string | null;
  error: string | null;
};

export type AuthAction = Partial<AuthState> & {
  type: authTypes;
};

export type AuthActions = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: () => Promise<void>;
};

export const authActions = (
  dispatch: React.Dispatch<AuthAction>
): AuthActions => ({
  signIn: async (email, password) => {
    // In a production app, we need to send some data (usually username, password) to server and get a token
    // We will also need to handle errors if sign in failed
    // After getting token, we need to persist the token using `AsyncStorage`
    // In the example, we'll use a dummy token
    try {
      const {
        data,
      }: AxiosResponse<{
        token: string;
        userDetails: User;
      }> = await Axios.post('/api/auth/login', {
        email,
        password,
      });
      const { token, userDetails } = data;
      await AsyncStorage.setItem('userToken', token);
      dispatch({ type: authTypes.SIGN_IN, token });
    } catch (error) {
      dispatch({ type: authTypes.ERROR, error: error.message });
    }
  },
  signOut: () => {
    AsyncStorage.removeItem('userToken');
    dispatch({ type: authTypes.SIGN_OUT });
  },
  signUp: async () => {
    // In a production app, we need to send user data to server and get a token
    // We will also need to handle errors if sign up failed
    // After getting token, we need to persist the token using `AsyncStorage`
    // In the example, we'll use a dummy token

    dispatch({ type: authTypes.SIGN_IN, token: 'dummy-auth-token' });
  },
});

export const authReducer = (
  prevState: Partial<AuthState>,
  action: AuthAction
) => {
  switch (action.type) {
    case authTypes.RESTORE_TOKEN:
      return {
        ...prevState,
        token: action.token,
        isLoading: false,
        error: null,
      };
    case authTypes.SIGN_IN:
      return {
        ...prevState,
        isSignout: false,
        token: action.token,
        error: null,
      };
    case authTypes.SIGN_OUT:
      return {
        ...prevState,
        isSignout: true,
        error: null,
        token: null,
      };
    case authTypes.ERROR:
      return {
        ...prevState,
        isSignout: true,
        isLoading: false,
        error: action.error,
        token: null,
      };
  }
};
