import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../features/AuthFeatures";
import toast from "react-hot-toast";
import { unwrapResult } from "@reduxjs/toolkit";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, status } = useSelector(
    (state) => state.AuthState
  );
  const navigate = useNavigate();
  
  function handlesubmit(e) {
    e.preventDefault();
    console.log({ email, password });
    dispatch(LoginUser({ email, password }))
      .then(unwrapResult)
      .then(() => {
        toast.success("logged in successfully", { position: "bottom-center" });
        navigate("/");
      })
      .catch(() => {
        toast.error("login failed", { position: "bottom-center" });
      });


  }

  return (
    <div className="h-[100dvh] w-[100dvw] flex items-center justify-center">
      <form
        onSubmit={handlesubmit}
        className="flex flex-col items-center justify-center w-1/2 h-1/3 outline-1 border rounded-lg"
      >
        <h2>Login</h2>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 w-3/4 mt-2 py-2"
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 w-3/4 mt-2 py-2"
        />
        <Link to="/user/forgot/password" className="flex mt-2 w-3/4">
          <p className="text-xs mt-1 ml-auto hover:text-amazonYellow">
            Forgot password
          </p>
        </Link>
        {error ? (
          <p className="text-red-700 text-xs mt-3 ">
            email or password is incorrect
          </p>
        ) : null}
        <button
          type="submit"
          className="bg-yellow-300 mt-3 px-3 py-1 w-3/4 rounded-2xl"
          disabled={!status === "pending"}
        >
          Continue
        </button>
        <Link to="/register" className="flex mt-2 w-3/4">
          <p className="text-xs mt-1 mx-auto hover:text-amazonYellow">
            Dont have account
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
