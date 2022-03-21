const API_DOMAIN = "https://robic.herokuapp.com";
const API_URL = `${API_DOMAIN}/api`;

// Unauthorized endpoints
export const LOGIN_URL = `${API_URL}/auth/login`;
export const REGISTER_URL = `${API_URL}/auth/register`;

// Authorized endpoints
export const EXERCISE_DEFINITION_URL = `${API_URL}/exerciseDefinition`;
export const EXERCISE_URL = `${API_URL}/exercise`;
export const ANALYTICS_URL = `${API_URL}/analytics`;
