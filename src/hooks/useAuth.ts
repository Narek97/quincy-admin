import { LoginResponseType, LoginRequestType } from "../ts/types";
import { request } from "../utils/axios-rq";
import { getCookies } from "../utils/cookies";
import { QUINCY_ADMIN_TOKEN } from "../constants";
import { useMutation, useQuery } from "react-query";

const loginRequest = (data: LoginRequestType) => {
  return request({ url: "auth/login", method: "post", data });
};

export const getMeRequest = () => {
  return request({ url: "users/me", method: "get" });
};
export const useLogin = (
  onSuccess: (data: LoginResponseType) => void,
  onError: (error: Error) => void
) => {
  return useMutation(loginRequest, {
    onSuccess,
    onError,
  });
};

export const useGetMe = (
  onSuccess: (data: any) => void,
  onError: (error: Error) => void
) => {
  return useQuery("getMe", getMeRequest, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: !!getCookies(QUINCY_ADMIN_TOKEN),
  });
};
