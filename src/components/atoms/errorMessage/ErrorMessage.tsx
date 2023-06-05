import React, { FC } from "react";
import "./ErrorMessage.scss";

interface IErrorMessage {
  message: string;
}
const ErrorMessage: FC<IErrorMessage> = ({ message }) => {
  return <span className={"error-message"}>{message}</span>;
};

export default ErrorMessage;
