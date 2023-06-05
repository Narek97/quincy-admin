import { REACT_APP_COOKIE_DOMAIN } from "../constants/api";
import { ObjectKeysType } from "../ts/types";
import Cookies from "js-cookie";

export const cookiesOptions = (options?: ObjectKeysType) => {
  return {
    ...options,
  };
};

export const setCookies = (name: string, value: any) => {
  return Cookies.set(
    name,
    value,
    cookiesOptions({
      path: "/",
      domain: REACT_APP_COOKIE_DOMAIN,
    })
  );
};

export const getCookies = (name: string) => {
  return Cookies.get(name);
};

export const removeCookies = (name: string) => {
  return Cookies.remove(
    name,
    cookiesOptions({ expires: 0, path: "/", domain: REACT_APP_COOKIE_DOMAIN })
  );
};
