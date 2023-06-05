import React, { FC } from "react";
import "./LoginFormTemplate.scss";
import BaseLoadingButton from "../../../atoms/buttons/BaseLoadingButton";
import { LoginRequestType } from "../../../../ts/types";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { LOGIN_FORM_ELEMENTS } from "../../../../constants/formEleemets";
import { Link } from "react-router-dom";
import FormInputError from "../../../molecules/formInputError/FormInputError";

interface ILoginFormTemplate {
  control: Control<LoginRequestType>;
  onHandleSubmit: () => void;
  errors: FieldErrors<LoginRequestType>;
  loading: boolean;
}

const LoginFormTemplate: FC<ILoginFormTemplate> = ({
  control,
  onHandleSubmit,
  errors,
  loading,
}) => {
  return (
    <div className={"login-form-template"}>
      <form onSubmit={onHandleSubmit} className={"login-form-template--form"}>
        <h1 className={"login-form-template--title"}>Login</h1>
        <p className={"login-form-template--sub-title"}>
          Sign In to your account
        </p>
        {LOGIN_FORM_ELEMENTS.map((element, index) => (
          <Controller
            key={element.name}
            name={element.name as "email" | "password"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormInputError
                onChange={onChange}
                value={value}
                element={element}
                placeholder={element.placeholder}
                message={
                  errors[element.name as "email" | "password"]?.message || ""
                }
              />
            )}
          />
        ))}
        <div className={"login-form-template--footer"}>
          <BaseLoadingButton loading={loading} type={"submit"} name={"Login"} />
          <Link to={"forgot-password"}>Forgot password?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginFormTemplate;
