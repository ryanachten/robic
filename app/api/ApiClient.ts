import createClient from "openapi-fetch";
import { paths } from "./robic-openapi";

/**
 * EC2 Public IP
 */
const PUBLIC_API_URL = "http://35.174.97.134";
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? PUBLIC_API_URL;

export const apiClientHeaders = {
  Authorization: "",
};

export const apiClient = createClient<paths>({
  baseUrl: API_URL,
  headers: apiClientHeaders,
});
