import { getChapsByContentId } from "@/actions/ChaptersActions";
import { getContentByID } from "@/actions/contentsActions";
import ChapterList from "@/components/catalogues/ChapterList";
import ViewContentTop from "@/components/catalogues/ViewContentTop";
import ButtonAddNew from "@/components/dashboard/contents/chapters/add/ButtonAddNew";
import Header from "@/components/home/Header";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const ContentPageID = async ({ params }: Props) => {
  const { id } = await params;

  if (!id) {
    redirect("/catalogues");
  }

  const content = await getContentByID(id);

  if (!content) {
    redirect("/catalogues");
  }

  const chapters = await getChapsByContentId(id);

  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <div className="w-full ">
        <Header />
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Top presentation */}
          <ViewContentTop content={content} />

          {/* Chapiters */}
          <section className="px-4 flex flex-col gap-4 w-full">
            <div
              className="flex w-full flex-wrap gap-y-3 gap-x-4 lg:gap-x-6 items-center
            transition-all ease-in-out duration-300
            "
            >
              <h2 className="lg:text-4xl md:text-3xl text-xl font-bold tracking-tight underline underline-offset-8">
                Les chapitres
              </h2>
              <ButtonAddNew content={content} />
            </div>

            {/* Chapter List */}
            <ChapterList chapters={chapters} content={content} />
          </section>

          {/* Similaire content*/}
          <section></section>
        </div>
      </div>
    </Suspense>
  );
};

export default ContentPageID;
