"use client";
import { cn } from "@/lib/utils";
import { statusType } from "@/types/contentTypes";
import { CategoriesData, LanguagesData, StatusData } from "@/utils/data";
import {
  capitalizeFirstLetter,
  returnColorByStatus,
  returnDataValue,
} from "@/utils/functions";
import { Content } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

interface Props {
  content: Content;
}
const ViewContentTop = ({ content }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <section
      className="relative w-full flex md:flex-row flex-col items-center 
      md:items-start justify-center min-h-[680px] md:min-h-auto
     py-6 md:py-8 px-4 gap-6
     "
    >
      {/* image bkg */}
      {content.image && (
        <Image
          src={content.image}
          alt={content.title}
          priority
          width={1200}
          height={1000}
          className="w-full h-[680px] md:h-[450px] blur-3xl 
          absolute -z-20 top-0 left-0 object-cover"
        />
      )}

      {/* Image pres */}
      <div
        className="border border-secondary w-52 h-72 
      lg:w-80 md:w-72 md:h-96 rounded-xl shadow
      "
      >
        {content.image && (
          <Image
            src={content.image}
            alt={content.title}
            priority
            width={1200}
            height={1000}
            className="w-full h-full rounded-xl object-cover"
          />
        )}
      </div>

      {/* infos */}
      <div className="flex-1 z-10 md:h-[450px] flex flex-col gap-4 w-full md:w-auto text-white">
        <div className="w-full flex items-center flex-wrap gap-2.5">
          {/* category */}
          <span className="text-[#ff9900] text-xs uppercase font-medium opacity-80 tracking-tight">
            {returnDataValue({ data: CategoriesData, value: content.category })}
          </span>

          {/* status */}
          {content.status !== "on_going" && (
            <span
              className={cn(
                " text-xs uppercase font-medium opacity-80 tracking-tight"
              )}
              style={{
                color: returnColorByStatus(content.status as statusType),
              }}
            >
              {returnDataValue({ data: StatusData, value: content.status })}
            </span>
          )}
        </div>

        {/* title */}
        <h2 className="font-bold text-2xl lg:text-3xl tracking-tight capitalize">
          {content.title}
        </h2>

        {/* tags */}
        <div className="w-full flex items-center gap-2 flex-wrap">
          {content.tags.map((tag, index) => (
            <span
              key={index}
              className="capitalize text-[10px] 
                        text-white tracking-wide line-clamp-1
                        px-1.5 py-0.5 bg-primary rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* language */}
        <span className=" text-xs uppercase font-medium opacity-80 tracking-tight">
          {returnDataValue({ data: LanguagesData, value: content.language })}
        </span>

        {/* description */}
        <p className="line-clamp-6 text-sm opacity-90 max-h-40 md:h-40 overflow-hidden">
          {capitalizeFirstLetter(content.description)}
        </p>

        {/* buttons */}
        <div className="w-full flex items-center gap-4 mt-4">
          <Button>
            <span>Commencer à Lire</span>
          </Button>

          {/* modify */}
          {user && user.id === content.authorId && (
            <Button variant={"secondary"}>
              <span>Modifier</span>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ViewContentTop;
