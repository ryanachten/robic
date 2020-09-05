import { AxiosResponse } from 'axios';
import { User } from '../constants/Interfaces';
import { Axios } from '../constants/Api';
import { AsyncStorage } from 'react-native';
import { UserAction, userTypes } from './user';

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
  dispatch: React.Dispatch<AuthAction>,
  userDispatch: React.Dispatch<UserAction>
): AuthActions => ({
  signIn: async (email, password) => {
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
      userDispatch({ type: userTypes.LOGIN_USER, user: userDetails });
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

export const authReducer = (state: Partial<AuthState>, action: AuthAction) => {
  switch (action.type) {
    case authTypes.RESTORE_TOKEN:
      return {
        ...state,
        token: action.token,
        isLoading: false,
        error: null,
      };
    case authTypes.SIGN_IN:
      return {
        ...state,
        isSignout: false,
        token: action.token,
        error: null,
      };
    case authTypes.SIGN_OUT:
      return {
        ...state,
        isSignout: true,
        error: null,
        token: null,
      };
    case authTypes.ERROR:
      return {
        ...state,
        isSignout: true,
        isLoading: false,
        error: action.error,
        token: null,
      };
    default:
      return state;
  }
};
