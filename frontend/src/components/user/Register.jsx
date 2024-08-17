import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../features/AuthFeatures";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [prevAvatar, setPrevAvatar] = useState(
    "https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
  );
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.AuthState);
  const navigate = useNavigate();
  function handleAvatar(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPrevAvatar(reader.result);
        setAvatar(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  function handlesubmit(e) {
    e.preventDefault();
    dispatch(RegisterUser({ name, email, password, avatar }))
      .then(unwrapResult)
      .then((result) => {
        toast.success("registered successfully", { position: "bottom-center" });
        navigate("/");
      })
      .catch((err) => {
        toast.error("registered failed", { position: "bottom-center" });
      });
  }

  return (
    <>
      <div className="h-[100dvh] w-[100dvw] flex items-center justify-center">
        <form
          onSubmit={handlesubmit}
          className="flex flex-col items-center justify-center w-1/2 py-3 outline-1 border rounded-lg"
        >
          <h2 className="text-3xl">Register</h2>
          <img
            className="rounded-full w-16 mt-3 cursor-pointer h-16"
            src={prevAvatar}
            alt=""
          />
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 w-3/4 mt-2 py-2"
          />
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
          <input
            type="file"
            Register
            placeholder="Avatar"
            onChange={handleAvatar}
            className="border rounded px-3 w-3/4 mt-2 py-2"
          />
          {error ? (
            <p className="text-red-700 text-xs mt-3">
              email or password is already exist
            </p>
          ) : null}
          <button
            type="submit"
            className="bg-yellow-300 mt-3 px-3 py-1 w-3/4 rounded-2xl"
            disabled={!status === "pending"}
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
