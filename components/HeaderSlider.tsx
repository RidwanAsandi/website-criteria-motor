"use client";

import { assets } from "@/assets/assets";
import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";

type slider = {
  id: number;
  title: string;
  offer: string;
  buttonText1: string;
  imgSrc: StaticImageData;
};

const sliderData: slider[] = [
  {
    id: 1,
    title: "Honda Vario",
    offer: "Temukan motor yang berkualitas bersama kami.",
    buttonText1: "Contact Now",

    imgSrc: assets.vario,
  },
  {
    id: 2,
    title: "Yamaha Aerox",
    offer: "Temukan motor yang berkualitas bersama kami.",
    buttonText1: "Contact Now",
    imgSrc: assets.aerox,
  },
];

const HeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full pt-14">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-gray-600 pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                {/* <button className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium">
                  {slide.buttonText1}
                </button> */}
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium rounded-full border border-gray-600 hover:bg-gray-600 hover:text-white">
                  {slide.buttonText1}
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image
                className=""
                width={400}
                height={400}
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-gray-600" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
