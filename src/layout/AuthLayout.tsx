import React, { FC, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookies, removeCookies } from "../utils/cookies";
import { QUINCY_ADMIN_TOKEN } from "../constants";
import { useGetMe } from "../hooks/useAuth";
import Loading from "../components/atoms/loading/Loading";
import { userState } from "../store/user.atom";
import { useSetRecoilState } from "recoil";
import HeaderDrawer from "../components/templates/headerDrawer/HeaderDrawer";

interface IAuthLayout {
  children: React.ReactNode;
}

const AuthLayout: FC<IAuthLayout> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useSetRecoilState(userState);
  const token = getCookies(QUINCY_ADMIN_TOKEN);
  const { isLoading } = useGetMe(
    (userData) => {
      setUser(userData);
      location.pathname ? navigate(location.pathname) : navigate("/users");
    },

    () => {
      removeCookies(QUINCY_ADMIN_TOKEN);
      navigate("/login");
    }
  );

  useLayoutEffect(() => {
    !token && navigate("/login");
  }, [navigate, token]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <HeaderDrawer children={children} />
    </div>
  );
};

export default AuthLayout;
