import { User } from '../constants/Interfaces';

export enum userTypes {
  LOGIN_USER = 'LOGIN_USER',
}

export type UserState = User;

export type UserAction = {
  type: userTypes;
  user: UserState;
};

export type UserActions = {
  loginUser: (user: UserState) => void;
};

export const userActions = (
  dispatch: React.Dispatch<UserAction>
): UserActions => ({
  loginUser: (user: UserState) => {
    dispatch({ type: userTypes.LOGIN_USER, user });
  },
});

export const userReducer = (state: Partial<UserState>, action: UserAction) => {
  switch (action.type) {
    case userTypes.LOGIN_USER:
      return { ...action.user };
    default:
      return state;
  }
};
