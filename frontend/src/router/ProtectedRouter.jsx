import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
// import { LoadUser } from "../features/AuthFeatures";

const ProtectedRouter = () => {
  const { isAuthenticated, status } = useSelector((state) => state.AuthState);

  if (status === "pending" || status === "idle") {
    return <Spinner />;
  }
 
  if (status === "failed" && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (status === "success" && isAuthenticated) {
    return <Outlet />;
  }
  return null;


  
};

export default ProtectedRouter;
