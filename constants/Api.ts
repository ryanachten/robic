import axios from "axios";

const API_DOMAIN = "http://5006d57b4eb9.ngrok.io"; //"https://robic-api.herokuapp.com"
const API_URL = `${API_DOMAIN}/api`;

// TODO: not sure this instance really works
// - have issues assigning bearer token to it (i.e. in POST)
// - investigate...
export const Axios = axios.create({ baseURL: API_URL });

// Unauthorized endpoints
export const LOGIN_URL = `${API_URL}/auth/login`;
export const REGISTER_URL = `${API_URL}/auth/register`;

// Authorized endpoints
export const EXERCISE_DEFINITION_URL = `${API_URL}/exerciseDefinition`;
export const EXERCISE_URL = `${API_URL}/exercise`;
