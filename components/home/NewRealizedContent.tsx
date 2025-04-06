import React from "react";
import { ContentsData } from "@/utils/contentData";
import Link from "next/link";
import Image from "next/image";

const NewRealizedContent = () => {
  return (
    <div
      className="w-full max-w-7xl max-auto px-4 py-16 
    md:px-8 bg-secondary flex flex-col gap-6"
    >
      <h1 className="text-4xl uppercase tracking-tight font-bold">
        New Released Comic
      </h1>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 ">
        {ContentsData.slice(0, 4).map((content, idx) => (
          <Link href={"#"} key={idx}>
            <div className=" flex flex-col gap-4 group">
              {/* image */}
              <div className="overflow-hidden w-full h-48 rounded-lg">
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
              </div>
              {/* div */}
              <div className="w-full flex flex-col gap-2">
                <h3 className="text-sm capitalize line-clamp-1 tracking-tight font-medium">
                  {content.title}
                </h3>
                {/* category */}
                <p className="text-xs text-gray-500 tracking-wide uppercase flex w-full items-center gap-4">
                  <span> {content.category}</span>
                  <span className="text-orange-700">{content.language}</span>
                </p>
                {/* tags */}
                <div className="w-full flex items-center gap-2">
                  {content.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="capitalize text-xs 
                        text-white tracking-wide line-clamp-1
                        px-2 py-1 bg-primary rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewRealizedContent;
