import { AxiosResponse } from 'axios';
import { User } from '../constants/Interfaces';
import { Axios, LOGIN_URL, REGISTER_URL } from '../constants/Api';
import { AsyncStorage } from 'react-native';
import { UserAction, userTypes } from './user';

export enum authTypes {
  RESTORE_TOKEN = 'RESTORE_TOKEN',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
}

export type AuthState = {
  loading: boolean;
  signedOut: boolean;
  token: string | null;
  error: string | null;
};

export type AuthAction = Partial<AuthState> & {
  type: authTypes;
};

export type AuthActions = {
  restoreToken: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (user: UserForRegister) => Promise<void>;
};

export const initialAuthState: AuthState = {
  loading: true,
  signedOut: false,
  token: null,
  error: null,
};

type UserForRegister = Partial<User> & { email: string; password: string };

export const authActions = (
  dispatch: React.Dispatch<AuthAction>,
  userDispatch: React.Dispatch<UserAction>
): AuthActions => ({
  restoreToken: async () => {
    let userToken = null;

    try {
      userToken = await AsyncStorage.getItem('userToken');
    } catch (e) {
      // Restoring token failed
    }

    // After restoring token, we may need to validate it in production apps

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    dispatch({ type: authTypes.RESTORE_TOKEN, token: userToken });
  },
  signIn: async (email, password) => {
    dispatch({ type: authTypes.LOADING });
    try {
      const {
        data,
      }: AxiosResponse<{
        token: string;
        userDetails: User;
      }> = await Axios.post(LOGIN_URL, {
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
  signUp: async ({ firstName, lastName, email, password }: UserForRegister) => {
    try {
      await Axios.post(REGISTER_URL, {
        firstName,
        lastName,
        email,
        password,
      });
      dispatch({ type: authTypes.SIGN_UP });
    } catch (error) {
      dispatch({ type: authTypes.ERROR, error: error.message });
    }
  },
});

export const authReducer = (state: Partial<AuthState>, action: AuthAction) => {
  switch (action.type) {
    case authTypes.RESTORE_TOKEN:
      return {
        ...state,
        token: action.token,
        loading: false,
        error: null,
      };
    case authTypes.SIGN_IN:
      return {
        ...state,
        signedOut: false,
        loading: false,
        token: action.token,
        error: null,
      };
    case authTypes.SIGN_UP:
      return {
        ...state,
        signedOut: true,
        loading: false,
        token: null,
        error: null,
      };
    case authTypes.SIGN_OUT:
      return {
        ...state,
        signedOut: true,
        loading: false,
        error: null,
        token: null,
      };
    case authTypes.ERROR:
      return {
        ...state,
        signedOut: true,
        loading: false,
        error: action.error,
        token: null,
      };
    case authTypes.LOADING:
      return {
        ...state,
        signedOut: true,
        loading: true,
        error: null,
        token: null,
      };
    default:
      return state;
  }
};
