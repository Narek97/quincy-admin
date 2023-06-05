import React from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import { LoginResponseType, LoginRequestType } from "../../ts/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN_FORM_VALIDATION } from "../../constants/yupValidation";
import LoginFormTemplate from "../../components/templates/forms/LoginFormTemplate/LoginFormTemplate";
import { useLogin } from "../../hooks/useAuth";
import { setCookies } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { QUINCY_ADMIN_TOKEN } from "../../constants";

const Login = () => {
  const navigate = useNavigate();

  const onSuccess = (data: LoginResponseType) => {
    setCookies(QUINCY_ADMIN_TOKEN, data.accessToken);
    navigate("/users");
  };

  const onError = (error: Error) => {
    console.log(error);
  };

  const { mutate, isLoading } = useLogin(onSuccess, onError);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginRequestType>({
    resolver: yupResolver(LOGIN_FORM_VALIDATION),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onHandleSubmit = handleSubmit((formData: LoginRequestType) => {
    mutate(formData);
  });

  return (
    <div className={"login-page"}>
      <LoginFormTemplate
        control={control}
        onHandleSubmit={onHandleSubmit}
        errors={errors}
        loading={isLoading}
      />
    </div>
  );
};

export default Login;
