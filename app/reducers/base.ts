export type BaseState = {
  error: string | null;
};

export enum baseTypes {
  ERROR = "ERROR",
}

export type BaseActions = {
  type: baseTypes.ERROR;
  error: string;
};
