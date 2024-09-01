import React, { useState } from "react";
import { DialogTitle, Dialog, DialogPanel } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeUserPassword, UpdateUser } from "../../features/AuthFeatures";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export default function UpdatePa({ openpswd, setopenpswd }) {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.AuthState);

  function handlefunctionsubmit(e) {
    e.preventDefault();

    dispatch(ChangeUserPassword({ oldPassword, password }))
      .then(unwrapResult)
      .then(() => {
        toast.success("Profile Updated", { position: "bottom-center" });
        setopenpswd(!openpswd);
      })
      .catch(() => {
        toast.error("couldn't update", { position: "bottom-center" });
      });
  }

  return (
    <>
      <Dialog
        open={openpswd}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-gray-100 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle className="flex justify-end">
                <img
                  src="https://img.icons8.com/?size=100&id=46&format=png&color=000000"
                  className="w-6 mb-2 cursor-pointer opacity-60"
                  onClick={() => setopenpswd(!openpswd)}
                  alt="close"
                />{" "}
              </DialogTitle>
              <form
                onSubmit={handlefunctionsubmit}
                className="flex flex-col items-center justify-center py-3 outline-1 border rounded-lg"
              >
                <h2 className="text-3xl">Change Password</h2>

                <input
                  type="password"
                  placeholder="Old Password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="border rounded px-3 w-3/4 mt-2 py-2"
                />
                <input
                  type="password"
                  placeholder="New password"
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  update
                </button>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
