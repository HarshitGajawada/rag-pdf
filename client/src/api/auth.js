import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const login = (email, password) =>
  axios.post(`${API}/auth/login`, { email, password });

export const register = (name, email, password, role) =>
  axios.post(`${API}/auth/register`, { name, email, password, role });

export const getMe = (token) =>
  axios.get(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
