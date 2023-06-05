import axios, { AxiosError } from "axios";
import { getCookies } from "./cookies";
import { REACT_APP_BASE_URL } from "../constants/api";
import { QUINCY_ADMIN_TOKEN } from "../constants";

const client = axios.create({ baseURL: REACT_APP_BASE_URL });

client.interceptors.request.use(function (config) {
  if (config.headers) {
    const token = getCookies(QUINCY_ADMIN_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const request = async ({ ...options }) => {
  const onSuccess = (response: any) => {
    return response.data;
  };
  const onError = (error: AxiosError) => {
    throw error;
  };

  return client(options).then(onSuccess).catch(onError);
};
