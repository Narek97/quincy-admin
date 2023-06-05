import { atom } from "recoil";
import { LoginResponseType } from "../ts/types";

export const userState = atom({
  key: "user",
  default: null as LoginResponseType | null,
});
