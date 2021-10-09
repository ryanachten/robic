import actionCreatorFactory from "typescript-fsa";
import {
  Analytics,
  Token,
  User,
  UserForCreate,
  UserForLogin,
} from "../constants/Interfaces";

const actionCreator = actionCreatorFactory();

enum authTypes {
  RESTORE_TOKEN = "RESTORE_TOKEN",
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  SIGN_OUT = "SIGN_OUT",
}

export const requestRestoreToken = actionCreator.async<undefined, Token>(
  authTypes.RESTORE_TOKEN
);

export const requestSignIn = actionCreator.async<UserForLogin, User>(
  authTypes.SIGN_IN
);

export const requestSignUp = actionCreator.async<UserForCreate, undefined>(
  authTypes.SIGN_UP
);

export const requestSignOut = actionCreator.async<undefined, undefined>(
  authTypes.SIGN_OUT
);
