import AsyncStorage from "@react-native-community/async-storage";
import { User } from "../constants/Interfaces";
import { StorageKeys } from "../constants/StorageKeys";
import { BaseActions, BaseState, baseTypes } from "./base";

export enum userTypes {
  LOGIN_USER = "LOGIN_USER",
  RESTORE_USER = "RESTORE_USER",
}

export type UserState = BaseState & {
  user: User;
};

export type UserAction =
  | BaseActions
  | {
      type: userTypes.LOGIN_USER;
      user: User;
    }
  | {
      type: userTypes.RESTORE_USER;
      user: User;
    };

export type UserActions = {
  restoreUser: () => Promise<void>;
};

export const initialUserState: UserState = {
  user: {
    id: "",
    firstName: "",
    lastName: "",
    exercises: [],
  },
  loading: false,
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
    case userTypes.LOGIN_USER:
      return { user: action.user, loading: false, error: null };
    case userTypes.RESTORE_USER:
      return { user: action.user, loading: false, error: null };
    case baseTypes.ERROR:
      return {
        user: { ...initialUserState.user },
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
