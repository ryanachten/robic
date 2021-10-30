import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../constants/Interfaces";
import { StorageKeys } from "../constants/StorageKeys";
import { BaseActions, BaseState, baseTypes } from "./base";

export enum userTypes {
  LOADING_LOGIN_USER = "LOADING_LOGIN_USER",
  LOGIN_USER = "LOGIN_USER",
  LOADING_RESTORE_USER = "LOADING_RESTORE_USER",
  RESTORE_USER = "RESTORE_USER",
}

export type UserAction =
  | BaseActions
  | { type: userTypes.LOADING_LOGIN_USER }
  | {
      type: userTypes.LOGIN_USER;
      user: User;
    }
  | { type: userTypes.LOADING_RESTORE_USER }
  | {
      type: userTypes.RESTORE_USER;
      user: User;
    };

export type UserActions = {
  restoreUser: () => Promise<void>;
};

export type UserState = BaseState & {
  user: User;
  loadingLoginUser: boolean;
  loadingRestoreUser: boolean;
};

export const initialUserState: UserState = {
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    exercises: [],
  },
  loadingLoginUser: false,
  loadingRestoreUser: false,
  error: null,
};

export const userActions = (
  dispatch: React.Dispatch<UserAction>
): UserActions => ({
  restoreUser: async () => {
    try {
      const userState = await AsyncStorage.getItem(StorageKeys.User);
      if (userState) {
        const user: User = JSON.parse(userState);
        dispatch({ type: userTypes.RESTORE_USER, user });
      }
    } catch (e) {
      dispatch({ type: baseTypes.ERROR, error: e.message });
    }
  },
});

export const userReducer = (
  state: UserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case userTypes.LOADING_LOGIN_USER:
      return { ...state, loadingLoginUser: true };
    case userTypes.LOGIN_USER:
      return {
        ...state,
        user: action.user,
        loadingLoginUser: false,
        error: null,
      };
    case userTypes.LOADING_RESTORE_USER:
      return { ...state, loadingRestoreUser: true };
    case userTypes.RESTORE_USER:
      return {
        ...state,
        user: action.user,
        loadingRestoreUser: false,
        error: null,
      };
    case baseTypes.ERROR:
      return {
        ...state,
        user: { ...initialUserState.user },
        loadingLoginUser: false,
        loadingRestoreUser: false,
        error: action.error,
      };
    default:
      return state;
  }
};
