export type BaseState = {
  // loading: boolean;
  error: string | null;
};

export enum baseTypes {
  ERROR = "ERROR",
  LOADING = "LOADING",
}

export type BaseActions = {
  type: baseTypes.ERROR;
  error: string;
};
// | {
//     type: baseTypes.LOADING;
//   };
