import React, { useRef, useState } from "react";
import {
  ban5,
  Gff,
  phone1,
  phone2,
  phone3,
  phone4,
  smarttv1,
  smarttv2,
  smarttv3,
  smarttv4,
} from "../utils";
import { ban4 } from "../utils";
import { ban3 } from "../utils";
import { ban2 } from "../utils";
import { ban1 } from "../utils";
import { ban6 } from "../utils";

const Sliders = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const sliderimages = [ban1, ban2, ban3, ban4, ban5, ban6];
  const imgRef = useRef();

  const prevImg = () => {
    setImgIndex((index) => {
      if (index === 0) return sliderimages.length - 1;
      return index - 1;
    });
  };

  const nextImg = () => {
    setImgIndex((index) => {
      if (index === sliderimages.length - 1) return 0;
      return index + 1;
    });
  };
  console.log(import.meta.env.VITE_BASE_URL);
  

  return (
    <div className="h-auto">
      <section className="slider-container ">
        <div
          className="flex  absolute -z-10 overflow-x-hidden "
          style={{ zIndex: "-10" }}
        >
          {sliderimages.map((data, index) => {
            return (
              <img
                src={data}
                alt=""
                id={index}
                key={index}
                style={{ translate: `${-100 * imgIndex}%`, zIndex: "100" }}
                className="slider-image relative flex-grow flex-shrink"
                width="100%"
              />
            );
          })}
        </div>
        <button
          type="button"
          style={{ zIndex: "10000" }}
          className=" w-10 relative left-5 top-[20%] z-10 invisible md:visible"
          onClick={prevImg}
        >
          <img
            src="https://img.icons8.com/?size=60&id=1806&format=png&color=000000"
            alt=""
          />
        </button>
        <button
          type="button"
          className=" w-10 relative top-[20%] left-[90%] invisible md:visible"
          onClick={nextImg}
        >
          <img
            src="https://img.icons8.com/?size=60&id=61&format=png&color=000000"
            alt=""
          />
        </button>
        <div className="grid grid-rows-1 z-20 grid-flow-col relative px-5 left-auto right-auto top-[20%] ss:top-[50%] gap-1 gap-x-4">
          <div className=" bg-white ">
            <p className="py-2 text-center font-bold text-sm md:text-base">
              Deals on smartphones thet suits your budget
            </p>
            <div className="grid grid-rows-2 p-2.5 gap-3  grid-cols-2">
              <div>
                <img src={phone1} alt="" />{" "}
              </div>
              <div>
                <img src={phone2} alt="" />
              </div>
              <div>
                <img src={phone3} alt="" />
              </div>
              <div>
                <img src={phone4} alt="" />
              </div>
            </div>
          </div>
          <div className=" bg-white ">
            <p className="py-2 text-center font-bold text-sm md:text-base">
              Up to 65% off | Televisions
            </p>
            <div className="grid grid-rows-2 p-2.5 gap-3  grid-cols-2">
              <div>
                <img src={smarttv1} alt="" />{" "}
              </div>
              <div>
                <img src={smarttv2} alt="" />
              </div>
              <div>
                <img src={smarttv3} alt="" />
              </div>
              <div>
                <img src={smarttv4} alt="" />
              </div>
            </div>
          </div>
          <div className=" bg-white ">
            <p className="py-2 text-center font-bold text-sm md:text-base">
              Great Freedom Sale | Shop now
            </p>
            <div className="p-3 ">
              <div>
                <img src={Gff} width="100%" alt="" />{" "}
              </div>
            </div>
          </div>
          <div className=" bg-white ">
            <p className="py-2 text-center font-bold text-sm md:text-base ">
              Deals on smartphones thet suits your budget
            </p>
            <div className="grid grid-rows-2 p-2.5 gap-3  grid-cols-2">
              <div>
                <img src={phone1} alt="" />{" "}
              </div>
              <div>
                <img src={phone2} alt="" />
              </div>
              <div>
                <img src={phone3} alt="" />
              </div>
              <div>
                <img src={phone4} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sliders;
