"use client";
import { Content } from "@prisma/client";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import no_img from "@/public/images/no_image.png";
import { returnDataValue } from "@/utils/functions";
import { CategoriesData, LanguagesData } from "@/utils/data";
import HeaderFilter from "./HeaderFilter";

interface Props {
  contents: Content[];
}
const MainContents = ({ contents }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [language, setLanguage] = useState("all");
  const [target, setTarget] = useState("all");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [tag, setTag] = useState("all");

  // filter the contents
  const filteredContents = useMemo(
    () =>
      contents
        .filter(
          (item) =>
            item.title.includes(searchText.toLowerCase()) ||
            (item.description &&
              item.description.includes(searchText.toLowerCase()))
        )
        .filter((item) =>
          category === "all" ? true : item.category.includes(category)
        )
        .filter((item) =>
          tag === "all" ? true : item.tags.some((t) => t === tag)
        )
        .filter((item) =>
          language === "all" ? true : item.language.includes(language)
        )
        .filter((item) =>
          target === "all" ? true : item.target.includes(target)
        )
        .filter((item) =>
          status === "all" ? true : item.status.includes(status)
        ),
    [contents, searchText, category, tag, language, target, status]
  );

  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col gap-8">
      {/* Top filter */}
      <HeaderFilter
        setSearchText={setSearchText}
        setLanguage={setLanguage}
        setTarget={setTarget}
        setCategory={setCategory}
        setStatus={setStatus}
        searchText={searchText}
        language={language}
        target={target}
        category={category}
        status={status}
        tag={tag}
        setTag={setTag}
      />
      {filteredContents.length === 0 && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Aucun résultat ne correspond à votre recherche.
        </p>
      )}

      {/* Your posts */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
        {filteredContents.map((content) => (
          <div key={content.id} className="w-full flex flex-col gap-2.5 group">
            {/* image */}
            <div className="w-full h-64 overflow-hidden rounded-lg relative">
              <Image
                src={content.image ?? no_img}
                alt={content.title}
                width={1000}
                height={800}
                priority
                className="w-full h-full md:h-72 object-cover rounded-lg 
          transition-transform duration-500 ease-in-out group-hover:scale-125"
              />
            </div>
            {/* content */}
            <div className="w-full flex flex-col gap-1.5">
              <h2 className="font-bold tracking-tight capitalize text-sm line-clamp-1">
                {content.title}
              </h2>
              {/* category */}
              <p
                className="text-xs text-gray-500 uppercase
              tracking-wide w-full flex items-center justify-between"
              >
                <span>
                  {returnDataValue({
                    data: CategoriesData,
                    value: content.category,
                  })}
                </span>
                <span>
                  <span>
                    {returnDataValue({
                      data: LanguagesData,
                      value: content.language,
                    })}
                  </span>
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContents;
