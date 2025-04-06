"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ContentsData } from "@/utils/contentData";
import Image from "next/image";
import { ArrowBigRight, ArrowBigRightDash } from "lucide-react";
import { Button } from "../ui/button";

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex === ContentsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => handleNext(), 5000);
    return () => clearInterval(interval);
  }, []);

  const content = useMemo(() => ContentsData[index], [index]);

  return (
    <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-4 px-4 gap-x-2 gap-y-2">
      {/* section 1 */}
      <section className="w-full h-96 lg:col-span-3 relative p-4">
        {/* bg image blur background */}
        <Image
          className="w-full h-full object-cover blur-lg shadow absolute inset-0
          transition-opacity duration-500 ease-in-out rounded-lg -z-20"
          src={content.image}
          alt={content.title}
          priority
          width={1000}
          height={800}
        />
        <div className="w-full h-full relative">
          {/* image bg 2 */}
          <Image
            className="w-full h-full object-cover shadow-xl brightness-75 -z-10
          transition-opacity duration-500 ease-in-out rounded-lg absolute inset-0"
            src={content.image}
            alt={content.title}
            priority
            width={1000}
            height={800}
          />

          {/* content */}
          <div className="w-full h-full px-4 gap-3 py-6 z-20 text-white flex flex-col justify-end">
            {/* category */}
            <p className="capitalize text-sm font-medium text-[#ff9900]">
              {content.category} .
            </p>
            {/* title */}
            <h1 className="lg:text-3xl text-xl font-bold leading-tight tracking-tight line-clamp-1 max-w-md">
              {content.title}
            </h1>
            {/* tags */}
            <div className="w-full flex items-center gap-2">
              {content.tags.map((tag, index) => (
                <span
                  key={index}
                  className="capitalize text-xs 
                  text-white tracking-wide
                  px-2 py-1 bg-primary rounded-lg
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* lang */}
            <div className="w-full flex items-center gap-2">
              {content.language.split(" ").map((language, index) => (
                <span
                  key={index}
                  className="uppercase text-xs 
                      text-white tracking-wide
                      
                      "
                >
                  {language}
                </span>
              ))}
            </div>

            {/* description */}
            <p
              className="w-full text-sm text-white tracking-wide leading-normal
              max-w-md text-justify line-clamp-3
            "
            >
              {content.description}
            </p>
          </div>
        </div>

        {/* absolute next button */}
        <div
          className="size-10 bg-white/50 shadow-lg rounded-full flex  
          items-center justify-center absolute top-1/3 right-8 -translate-y-1/2
          transition-opacity duration-500 ease-in-out"
          onClick={handleNext}
        >
          <ArrowBigRight size={34} />
        </div>
      </section>

      {/* section 2 */}
      <section className="w-full py-4 lg:h-96 px-4 lg:px-0 box-border">
        <div className="bg-amber-800 rounded-lg shadow-xl lg:px-2 h-full">
          <div className="w-full px-4 gap-3 py-6 text-white flex flex-col items-center">
            <h1 className=" text-3xl font-bold leading-tight tracking-tight">
              Explorez nos nouveaux contenus
            </h1>
            <p className="text-sm tracking-wide leading-normal max-w-md text-center">
              Discutez avec nos créateurs et découvrez de nouveaux mangas,
              tomes, illustrations et autres publications.
            </p>

            {/* button */}
            <div className="w-full flex items-center gap-4 mt-2 justify-center">
              <Button
                variant={"outline"}
                className="px-6 py-6 flex gap-4 items-center w-full text-black"
              >
                <span>Voir plus </span>
                <ArrowBigRightDash className="shrink-0 size-8" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
