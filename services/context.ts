import { createContext } from "react";
import { AuthActions, AuthState } from "../reducers/auth";
import { UserActions, UserState } from "../reducers/user";
import {
  ExerciseDefinitionActions,
  ExerciseDefinitionState,
} from "../reducers/exerciseDefinition";

export const AuthContext = createContext<{
  state: Partial<AuthState>;
  actions: AuthActions;
}>({});

export const UserContext = createContext<{
  state: Partial<UserState>;
  actions: UserActions;
}>({});

export const ExerciseDefintionContext = createContext<{
  state: ExerciseDefinitionState;
  actions: ExerciseDefinitionActions;
}>({});
