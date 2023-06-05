import React, { FC } from "react";
import "./FormInputError.scss";
import BaseInput from "../../atoms/inputs/BaseInput";
import ErrorMessage from "../../atoms/errorMessage/ErrorMessage";

interface IFormInputError {
  message: string;
  element: any;
  iconPosition?: "start" | "end";
  onChange: () => void;
  value: string;
  placeholder?: string;
}

const FormInputError: FC<IFormInputError> = ({
  message,
  element,
  iconPosition = "end",
  onChange,
  value,
  placeholder,
}) => {
  return (
    <div className={"form-input-error"}>
      <BaseInput
        iconPosition={iconPosition}
        key={element.name}
        icon={element.icon}
        isIconButton={element.isIconButton}
        type={element.type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
      <ErrorMessage message={message} />
    </div>
  );
};

export default FormInputError;
