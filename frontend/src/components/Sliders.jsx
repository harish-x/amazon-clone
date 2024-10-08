import React, { useState, useRef, useEffect } from "react";
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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Sliders = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const sliderimages = [ban1, ban2, ban3, ban4, ban5, ban6];
  const [parentHeight, setParentHeight] = useState(0);

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
  const parentRef = useRef(null);
  const childRef = useRef(null);
  useEffect(() => {
    if (parentRef.current && childRef.current) {
      const childRect = childRef.current.getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();
      setParentHeight(childRect.bottom - parentRect.top);
    }
  }, []);


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className="h-auto">
      <section
        className="slider-container hidden sm:block overflow-hidden"
        style={{ height: `${parentHeight}px !important` }}
        ref={parentRef}
      >
        <div
          className="flex slider-image-container absolute w-full h-full"
          style={{
            transform: `translateX(${-100 * imgIndex}%)`,
            transition: "transform 0.7s ease-in-out"
          }}
        >
          {sliderimages.map((data, index) => (
            <img
              src={data}
              alt=""
              key={index}
              className="slider-image block w-full object-cover"
              style={{ flex: "0 0 100%" }}
            />
          ))}
        </div>
        <button
          type="button"
          style={{ zIndex: "10000" }}
          className=" w-10 relative left-5  z-10 invisible md:visible"
          onClick={prevImg}
        >
          <img
            src="https://img.icons8.com/?size=60&id=1806&format=png&color=000000"
            alt=""
          />
        </button>
        <button
          type="button"
          className=" w-10 relative  left-[93%] pt-20 invisible md:visible"
          onClick={nextImg}
        >
          <img
            src="https://img.icons8.com/?size=60&id=61&format=png&color=000000"
            alt=""
          />
        </button>
        <div
          className="grid grid-cols-1 gap-x-3 gap-y-5 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-4 xl:gap-x-6  relative px-5 left-auto right-auto mt-[17%] lg:mt-[18%] lx:mt-[20%] w-full gap-1"
          ref={childRef}
        >
          <div className=" bg-white height">
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
            <div className="p-3">
              <div className="flex items-center justify-center">
                <img src={Gff} width="80%" alt="" />{" "}
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
      <section className="block sm:hidden overflow-hidden">
        <Slider {...settings}>
          {Array.from({ length: 5 }).map((_, i) => (
            <img
              src={`/assets/slider/${i + 1}.jpg`}
              key={i}
              alt=""
              className=""
            />
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default Sliders;
