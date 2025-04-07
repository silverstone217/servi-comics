import { getMyContent } from "@/actions/contentsActions";
import MainContents from "@/components/dashboard/contents/MainContents";
import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const ContentPage = async () => {
  const contents = await getMyContent();
  return (
    <div>
      {/* top part */}
      <section
        className="w-full flex md:flex-row flex-col gap-4
       md:items-center md:justify-between
       p-4 transition-all duration-300 ease-in-out
       max-w-7xl mx-auto
       "
      >
        <div>
          <h2 className="text-4xl font-bold tracking-tight">
            Mes publications
          </h2>
          <p
            className="
          text-sm font-medium tracking-wide leading-relaxed text-gray-500
          "
          >
            {` Devenez l'artiste ou l'auteur que vous avez toujours revé d'etre.`}
          </p>
        </div>
        <Button asChild>
          <Link
            href={"/contents/nouveau"}
            className="flex items-center gap-3 justify-center"
          >
            <SquarePlus className="shrink-0 size-6" />
            <span>Ajouter un nouveau</span>
          </Link>
        </Button>

        {/* pagination */}
        {/* add new post */}
      </section>

      {/* your posts */}
      <MainContents contents={contents} />
    </div>
  );
};

export default ContentPage;
