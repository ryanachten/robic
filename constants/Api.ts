import axios from 'axios';

// This URL is forwarded using ngrok for development purposes
// URL is temporary and will not be used in production
// TODO: handle this better using a process.env flag

const API_DOMAIN = 'https://f8d956799d94.ngrok.io';
const API_URL = `${API_DOMAIN}/api`;

export const Axios = axios.create({ baseURL: API_URL });

// Unauthorized endpoints
export const LOGIN_URL = `${API_URL}/auth/login`;
export const REGISTER_URL = `${API_URL}/auth/register`;

// Authorized endpoints
export const EXERCISE_DEFINITION_URL = `${API_URL}/exerciseDefinition`;
