import createClient from "openapi-fetch";
import { paths } from "./robic-swagger"; // generated from openapi-typescript

// TODO: set via env variables
const API_DOMAIN = "http://10.0.2.2:5000";

export const clientHeaders = {
  Authorization: "",
};

const client = createClient<paths>({
  baseUrl: API_DOMAIN,
  headers: clientHeaders,
});
export default client;
