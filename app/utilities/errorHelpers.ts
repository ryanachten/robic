import { components } from "../api/robic-swagger";

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const getErrorDetail = (e: components["schemas"]["ProblemDetails"]) => {
  return e.detail ?? "Something went wrong";
};
