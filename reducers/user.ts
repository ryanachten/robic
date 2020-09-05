import { User } from '../constants/Interfaces';

export enum userTypes {
  LOGIN_USER = 'LOGIN_USER',
}

export type UserAction = {
  type: userTypes;
  user: User;
};

export type UserActions = {
  loginUser: (user: User) => void;
};

export const userActions = (
  dispatch: React.Dispatch<UserAction>
): UserActions => ({
  loginUser: (user: User) => {
    dispatch({ type: userTypes.LOGIN_USER, user });
  },
});

export const userReducer = (state: Partial<User>, action: UserAction) => {
  switch (action.type) {
    case userTypes.LOGIN_USER:
      return { ...action.user };
    default:
      return state;
  }
};
