import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import { Logoutuser } from "../../features/AuthFeatures";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { isAuthenticated, user, status } = useSelector(
    (state) => state.AuthState
  );
  let [isOpen, setIsOpen] = useState(false);
  const [openpswd, setopenpswd] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handlelogout() {
    dispatch(Logoutuser())
      .then(unwrapResult)
      .then(() => {
        toast.success("loged out successfuly", { position: "bottom-center" });
        navigate("/");
        window.location.reload();
      })
      .catch(() => {
        toast.error("logot failed");
      });
  }
  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <div>
          {!isAuthenticated ? (
            <h1 className="text-center text-4xl">Please Login</h1>
          ) : (
            <div>
              {user.map((data, index) => {
                return (
                  <div key={index}>
                    <img
                      src={
                        data.user.avatar ??
                        "https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
                      }
                      alt="profile"
                      className="h-24 rounded-s-full"
                    />
                    <p>{data.user.name}</p>
                    <p>{data.user.email}</p>
                    <button
                      type="button"
                      className="bg-green-500 p-3"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      Edit{" "}
                    </button>
                    <button type="button" onClick={handlelogout}>
                      Log out
                    </button>
                    <button
                      type="button"
                      className="bg-red-600 p-2 ml-3"
                      onClick={() => setopenpswd(!openpswd)}
                    >
                      Change password
                    </button>
                    <UpdateProfile
                      openstate={isOpen}
                      setOpenstate={setIsOpen}
                    />
                    <UpdatePassword
                      openpswd={openpswd}
                      setopenpswd={setopenpswd}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
