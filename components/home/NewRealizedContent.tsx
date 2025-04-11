import React from "react";
// import { ContentsData } from "@/utils/contentData";
import Link from "next/link";
import Image from "next/image";
import { returnDataValue } from "@/utils/functions";
import { CategoriesData, LanguagesData } from "@/utils/data";
import { ArrowBigRightDash } from "lucide-react";
import { Content } from "@prisma/client";

type Props = {
  contents: Content[];
};

const NewRealizedContent = ({ contents }: Props) => {
  if (contents.length < 1) {
    return null;
  }

  return (
    <div
      className="w-full max-w-7xl max-auto px-4 py-16 
    md:px-8 bg-secondary flex flex-col gap-6"
    >
      <div className="w-full flex items-center justify-between gap-3">
        <h1 className="text-4xl uppercase tracking-tight font-bold">
          Nouveaux Comics
        </h1>
        <Link href={"#"} className="lg:flex hidden items-center gap1.5">
          <span
            className="
          text-sm text-amber-600 hover:text-amber-800
          transition-all duration-300 ease-in-out"
          >
            Voir plus
          </span>
        </Link>
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 ">
        {contents.slice(0, 5).map((content, idx) => (
          <Link href={"#"} key={idx}>
            <div className=" flex flex-col gap-4 group">
              {/* image */}
              <div className="overflow-hidden w-full h-64 rounded-lg">
                {content.image && (
                  <Image
                    className="w-full h-full object-cover rounded-lg
                transition-transform duration-500 ease-in-out
                group-hover:scale-125
                "
                    src={content.image}
                    alt={content.title}
                    width={1000}
                    height={800}
                    priority
                  />
                )}
              </div>
              {/* div */}
              <div className="w-full flex flex-col gap-2">
                <h3 className="text-sm capitalize line-clamp-1 tracking-tight font-medium">
                  {content.title}
                </h3>
                {/* category */}
                <p
                  className="text-xs text-gray-500 tracking-wide 
                uppercase flex w-full items-center gap-4 justify-between"
                >
                  <span>
                    {returnDataValue({
                      data: CategoriesData,
                      value: content.category,
                    })}
                  </span>
                  <span className="">
                    {returnDataValue({
                      data: LanguagesData,
                      value: content.language,
                    })}
                  </span>
                </p>
                {/* tags */}
                <div className="w-full flex items-center gap-2">
                  {content.tags.slice(0, 2).map((tag, index) => (
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
              </div>
            </div>
          </Link>
        ))}

        {/* Voir plus link for small media */}
        <Link
          href={"#"}
          className="lg:hidden flex flex-col gap-4 group 
          items-center  w-full
          
          "
        >
          <div
            className="bg-amber-900 rounded-lg flex flex-col gap-2.5 group 
          items-center justify-center w-full h-64"
          >
            <span className="font-bold text-3xl tracking-tight text-balance text-white">
              Voir plus
            </span>
            <ArrowBigRightDash className="shrink-0 size-14 text-white" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NewRealizedContent;
