import AsyncStorage from '@react-native-community/async-storage';
import { User } from '../constants/Interfaces';
import { StorageKeys } from '../constants/StorageKeys';

export enum userTypes {
  LOGIN_USER = 'LOGIN_USER',
  RESTORE_USER = 'RESTORE_USER',
}

export type UserState = User;

export type UserAction = {
  type: userTypes;
  user: UserState;
};

export type UserActions = {
  restoreUser: () => Promise<void>;
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
      // Restoring user failed
    }
  },
});

export const userReducer = (state: Partial<UserState>, action: UserAction) => {
  switch (action.type) {
    case userTypes.LOGIN_USER:
      return { ...action.user };
    case userTypes.RESTORE_USER:
      return { ...action.user };
    default:
      return state;
  }
};
