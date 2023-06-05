import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RouteType } from "../ts/types";
import SuspenseLayout from "../layout/SuspenseLayout";
import GuestLayout from "../layout/GuestLayout";
import AuthLayout from "../layout/AuthLayout";

const Login = lazy(() => import("../pages/login/index"));
const Signup = lazy(() => import("../pages/signup/index"));
const Users = lazy(() => import("../pages/users/index"));
const Benefits = lazy(() => import("../pages/benefits/index"));
const Coupons = lazy(() => import("../pages/coupons/index"));
const WebHistory = lazy(() => import("../pages/webHistory/index"));
const NotFound = lazy(() => import("../pages/NotFound/index"));


const Routing = () => {
  const guestRouting: Array<RouteType> = [
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
  ];
  const authRouting: Array<RouteType> = [
    { path: "/users", element: <Users /> },
    { path: "/benefits", element: <Benefits /> },
    { path: "/coupons", element: <Coupons /> },
    { path: "/web-history", element: <WebHistory /> },
  ];

  return (
    <Routes>
      {guestRouting.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <Suspense fallback={<SuspenseLayout />}>
              <GuestLayout>{route.element}</GuestLayout>
            </Suspense>
          }
        />
      ))}
      {authRouting.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <AuthLayout>
              <Suspense fallback={<SuspenseLayout />}>{route.element}</Suspense>
            </AuthLayout>
          }
        />
      ))}
      <Route
        path={"*"}
        element={
          <Suspense fallback={<SuspenseLayout />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Routing;
