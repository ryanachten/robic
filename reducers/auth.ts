import { AxiosResponse } from 'axios';
import { User } from '../constants/Interfaces';
import { Axios } from '../constants/Api';
import { AsyncStorage } from 'react-native';

export enum authTypes {
  RESTORE_TOKEN = 'RESTORE_TOKEN',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

type AuthState = {
  isLoading: boolean;
  isSignout: boolean;
  token: string | null;
};

export type AuthAction = Partial<AuthState> & {
  type: authTypes;
};

export const authActions = (dispatch: React.Dispatch<AuthAction>) => ({
  signIn: async (email: string, password: string) => {
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
      // setError(error.message);
      // TODO: add error handling
      console.log('Login error!', error);
    }
  },
  signOut: () => dispatch({ type: authTypes.SIGN_OUT }),
  signUp: async (data) => {
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
      };
    case authTypes.SIGN_IN:
      return {
        ...prevState,
        isSignout: false,
        token: action.token,
      };
    case authTypes.SIGN_OUT:
      return {
        ...prevState,
        isSignout: true,
        token: null,
      };
  }
};
