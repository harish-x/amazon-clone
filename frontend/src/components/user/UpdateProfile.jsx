import React, { useState } from "react";
import { DialogTitle, Dialog, DialogPanel } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUser } from "../../features/AuthFeatures";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export default function UpdateProfile({ openstate, setOpenstate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [prevAvatar, setPrevAvatar] = useState(
    "https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
  );

  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.AuthState);


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


  function handlefunctionsubmit(e) {
    e.preventDefault();

    dispatch(UpdateUser({ name, email, avatar }))
      .then(unwrapResult)
      .then(() => {
        toast.success("Profile Updated",{position:"bottom-center"});
        setOpenstate(!openstate);
      })
      .catch(() => {
        toast.error("couldn't update", { position: "bottom-center" });
      });
  }

  return (
    <>
      <Dialog
        open={openstate}
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
                <img src="https://img.icons8.com/?size=100&id=46&format=png&color=000000" className="w-6 mb-2 cursor-pointer opacity-60" onClick={()=>setOpenstate(!openstate)} alt="close"/>              </DialogTitle>
              <form
                onSubmit={handlefunctionsubmit}
                className="flex flex-col items-center justify-center py-3 outline-1 border rounded-lg"
              >
                <h2 className="text-3xl">Update Profile</h2>
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
