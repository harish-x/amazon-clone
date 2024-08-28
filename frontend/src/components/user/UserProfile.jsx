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
            <div className="flex font-amazon items-center justify-center h-[calc(100vh-7rem)] w-full">
              {user.map((data, index) => {
                return (
                  <div
                    className="bg-white w-full flex flex-col relative mx-5 h-3/5 sm:w-1/3"
                    key={index}
                  >
                    <img
                      src={
                        data.user.avatar ??
                        "https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
                      }
                      alt="profile"
                      className="h-24 mx-auto m-2 rounded-s-full"
                    />
                    <p className="mt-2 self-center">{data.user.name}</p>
                    <p className="mt-2 self-center">Email: {data.user.email}</p>
                    <button
                      type="button"
                      className=" w-[80%] self-center bg-gray-100 rounded-full mt-3 p-3"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      Update your details
                    </button>
                    <button
                      type="button"
                      className="border px-3 self-center rounded-full w-[80%] mt-3 p-3"
                      onClick={() => setopenpswd(!openpswd)}
                    >
                      Change password
                    </button>
                    <button
                      type="button"
                      className="w-[80%] bg-amazonYellow border rounded-full self-center mt-3 p-3"
                      onClick={handlelogout}
                    >
                      Log out
                    </button>

                    <UpdateProfile
                      openstate={isOpen}
                      setOpenstate={setIsOpen}
                      username={data.user.name}
                      usermail={data.user.email}
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
