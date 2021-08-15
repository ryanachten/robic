import actionCreatorFactory from "typescript-fsa";
import { User } from "../constants/Interfaces";

const actionCreator = actionCreatorFactory();

enum userTypes {
  LOGIN_USER = "LOGIN_USER",
  RESTORE_USER = "RESTORE_USER",
}

export const requestLoginUser = actionCreator.async<undefined, User>(
  userTypes.LOGIN_USER
);

export const requestRestoreUser = actionCreator.async<undefined, User>(
  userTypes.RESTORE_USER
);
