import createClient from "openapi-fetch";
import { paths } from "./robic-openapi";

// TODO: set via env variables
const API_DOMAIN = "http://10.0.2.2:5000";

export const apiClientHeaders = {
  Authorization: "",
};

export const apiClient = createClient<paths>({
  baseUrl: API_DOMAIN,
  headers: apiClientHeaders,
});
