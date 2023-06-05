import React, { FC } from "react";
import { Button, ButtonProps } from "@mui/material";

interface IBaseButton {
  name: string;
  type?: "button" | "submit";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  variant?: "contained" | "outlined" | "text";
  sxStyles?: any;
}

const BaseButton: FC<IBaseButton & ButtonProps> = ({
  name,
  type = "button",
  size = "small",
  disabled = false,
  variant = "contained",
  sxStyles,
  ...buttonRestParams
}) => {
  return (
    <Button
      {...buttonRestParams}
      type={type}
      size={size}
      disabled={disabled}
      variant={variant}
    >
      {name}
    </Button>
  );
};

export default BaseButton;
