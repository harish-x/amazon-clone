import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center ">
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
