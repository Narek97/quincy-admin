import React, { FC } from "react";
import { LoadingButton } from "@mui/lab";
import { ButtonProps } from "@mui/material";

interface IBaseLoadingButton {
  loading?: boolean;
  name: string;
  type?: "button" | "submit";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  variant?: "contained" | "outlined" | "text";
  sxStyles?: any;
}
const BaseLoadingButton: FC<IBaseLoadingButton & ButtonProps> = ({
  loading = false,
  type = "button",
  size = "small",
  disabled = false,
  name,
  variant = "contained",
  sxStyles,
  ...buttonRestParams
}) => {
  const style = {
    ...sxStyles,
  };

  return (
    <LoadingButton
      {...buttonRestParams}
      loading={loading}
      disabled={disabled}
      type={type}
      size={size}
      variant={variant}
      sx={style}
    >
      <span>{name}</span>
    </LoadingButton>
  );
};

export default BaseLoadingButton;
