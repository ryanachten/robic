import { createContext } from 'react';
import { AuthActions, AuthState } from '../reducers/auth';

export const AuthContext = createContext<{
  state: Partial<AuthState>;
  actions: AuthActions;
}>({});
export const UserContext = createContext({});
