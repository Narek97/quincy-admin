import React, { FC } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";

interface IBaseInput {
  label?: string;
  variant?: "outlined" | "filled" | "standard";
  iconPosition?: "start" | "end";
  isIconButton?: boolean;
  icon?: React.ReactNode;
  onClickIconButton?: () => void;
  sxStyles?: any;
}

const BaseInput: FC<IBaseInput & TextFieldProps> = ({
  label,
  variant = "outlined",
  iconPosition = "start",
  isIconButton = false,
  icon,
  onClickIconButton,
  sxStyles,
  ...inputRestParams
}) => {
  const style = {
    ...sxStyles,
  };

  const inputProps = () => {
    switch (iconPosition) {
      case "start":
        return {
          startAdornment: icon ? (
            <InputAdornment position={"start"}>
              {isIconButton ? (
                <IconButton
                  aria-label="Icon"
                  sx={{ padding: 0 }}
                  onClick={onClickIconButton}
                >
                  {icon}
                </IconButton>
              ) : (
                <>{icon}</>
              )}
            </InputAdornment>
          ) : null,
        };
      case "end":
        return {
          endAdornment: icon ? (
            <InputAdornment position={"end"}>
              {isIconButton ? (
                <IconButton
                  aria-label="Icon"
                  sx={{ padding: 0 }}
                  onClick={onClickIconButton}
                >
                  {icon}
                </IconButton>
              ) : (
                <>{icon}</>
              )}
            </InputAdornment>
          ) : null,
        };
    }
  };

  return (
    <TextField
      {...inputRestParams}
      autoComplete="on"
      label={label}
      variant={variant}
      sx={style}
      InputProps={{ ...inputProps() }}
    />
  );
};

export default BaseInput;
