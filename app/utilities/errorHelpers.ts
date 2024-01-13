import { ProblemDetails } from "../api";

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const getErrorDetail = (e: ProblemDetails) => {
  return e.detail ?? "Something went wrong";
};
