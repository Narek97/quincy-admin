import { AccountCircle, VisibilityOff } from "@mui/icons-material";
import React from "react";

export const LOGIN_FORM_ELEMENTS: Array<{
  name: string;
  placeholder: string;
  type: string;
  icon: React.ReactNode;
  isIconButton: boolean;
}> = [
  {
    name: "email",
    placeholder: "Email",
    type: "text",
    icon: <AccountCircle />,
    isIconButton: false,
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    icon: <VisibilityOff />,
    isIconButton: true,
  },
];

export const BENEFIT_FORM_ELEMENTS: Array<{
  name: string;
  placeholder: string;
  type: string;
}> = [
  {
    name: "url",
    placeholder: "Url",
    type: "text",
  },
  {
    name: "description",
    placeholder: "Description",
    type: "text",
  },
];
