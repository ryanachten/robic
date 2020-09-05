export enum authTypes {
  RESTORE_TOKEN = 'RESTORE_TOKEN',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

type AuthState = {
  isLoading: boolean;
  isSignout: boolean;
  token: string | null;
};

export type AuthAction = Partial<AuthState> & {
  type: authTypes;
};

export const authReducer = (prevState, action) => {
  switch (action.type) {
    case authTypes.RESTORE_TOKEN:
      return {
        ...prevState,
        token: action.token,
        isLoading: false,
      };
    case authTypes.SIGN_IN:
      return {
        ...prevState,
        signedOut: false,
        token: action.token,
      };
    case authTypes.SIGN_OUT:
      return {
        ...prevState,
        isSignout: true,
        token: null,
      };
  }
};
