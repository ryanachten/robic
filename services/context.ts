import { createContext } from 'react';
import { AuthActions, AuthState } from '../reducers/auth';
import { User } from '../constants/Interfaces';
import { UserActions } from '../reducers/user';

export const AuthContext = createContext<{
  state: Partial<AuthState>;
  actions: AuthActions;
}>({});

export const UserContext = createContext<{
  state: Partial<User>;
  actions: UserActions;
}>({});
