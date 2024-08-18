import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { ForgotUserPassword } from "../../features/AuthFeatures";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  function handlesubmit(e) {
    e.preventDefault()
    console.log(email);
    dispatch(ForgotUserPassword({ email }))
      .then(unwrapResult)
      .then(() => {
        toast.success(`forgot password link is sent to ${email}`, {
          position: "bottom-center",
        })
   
      }
      )
      .catch((err) => toast.error('error', { position: "bottom-center" }));
  }
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <input type="email" placeholder="enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
       
        <button type="submit" className="bg-red-400">send email</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
