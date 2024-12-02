// axios.config.ts
import axios from "axios";
import { getCookie } from "cookies-next";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: process.env.NEXT_PUBLIC_API_TIMEOUT
    ? parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT, 10)
    : 30000, // Timeout de 30 segundos
});

Axios.interceptors.request.use(
  async (config) => {
    const token = getCookie("auth-token") || "";
    const accessToken = token.toString();

    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);

export default Axios;
