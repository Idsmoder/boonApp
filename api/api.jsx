import axios from "axios";
import { URL } from "./const";
import * as Secure from 'expo-secure-store';
const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const Token = await Secure.getItemAsync('access_token');
    if (Token) {
      config.headers.Authorization = `Bearer ${Token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
