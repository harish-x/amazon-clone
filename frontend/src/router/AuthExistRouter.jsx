import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AuthExistRouter = () => {
  const { isAuthenticated } = useSelector((state) => state.AuthState);

  if (isAuthenticated) {
    return <Navigate to="/myprofile" replace />;
  }

  return <Outlet />;
};

export default AuthExistRouter;
