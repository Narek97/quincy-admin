import { atom } from "recoil";
import { BenefitResponseType } from "../ts/types";

export const benefitsState = atom({
  key: "benefits",
  default: [] as BenefitResponseType[] | [],
});
