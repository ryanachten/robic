import axios from "axios";

const API_DOMAIN = "https://robic-api.herokuapp.com";
const API_URL = `${API_DOMAIN}/api`;

export const Axios = axios.create({ baseURL: API_URL });

// Unauthorized endpoints
export const LOGIN_URL = `${API_URL}/auth/login`;
export const REGISTER_URL = `${API_URL}/auth/register`;

// Authorized endpoints
export const EXERCISE_DEFINITION_URL = `${API_URL}/exerciseDefinition`;
