import { User } from '../constants/Interfaces';

enum types {
  LOGIN_USER = 'LOGIN_USER',
}

export type UserAction = {
  type: types;
  user: User;
};

export const userActions = {
  loginUser: (user: User) => ({ type: types.LOGIN_USER, user }),
};

export const userReducer = (state: User | null, action: UserAction) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return { ...action.user };
    default:
      return state;
  }
};
