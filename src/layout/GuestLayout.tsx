import React, { FC, useLayoutEffect } from "react";
import { getCookies } from "../utils/cookies";
import { useNavigate } from "react-router-dom";
import { QUINCY_ADMIN_TOKEN } from "../constants";

interface IGuestLayout {
  children: React.ReactNode;
}
const GuestLayout: FC<IGuestLayout> = ({ children }) => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (getCookies(QUINCY_ADMIN_TOKEN)) {
      navigate("/users");
    }
  }, [navigate]);

  return <div>{children}</div>;
};

export default GuestLayout;
