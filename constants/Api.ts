import axios from 'axios';

// This URL is forwarded using ngrok for development purposes
// URL is temporary and will not be used in production
// TODO: handle this better using a process.env flag
const API_URL = 'https://6a5c1b5f3577.ngrok.io';
export const Axios = axios.create({ baseURL: API_URL });
