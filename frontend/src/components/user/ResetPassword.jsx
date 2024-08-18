import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ResetUserPassword } from "../../features/AuthFeatures";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handlsubmit(e) {
    e.preventDefault();
    dispatch(ResetUserPassword({ password, confirmPassword, token }))
      .then(unwrapResult)
      .then(() => {
        toast.success("password has been updated", {
          position: "bottom-center",
        });
        navigate("/");
        window.location.reload();
      })
      .catch(() => toast.error("error", { position: "bottom-center" }));
  }
  return (
    <div>
      <form onSubmit={handlsubmit}>
        <input
          className="px-2 py-1 bg-gray-200 mx-2"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="px-2 py-1 bg-gray-200 mx-2"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="bg-red-400">
          Change password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
