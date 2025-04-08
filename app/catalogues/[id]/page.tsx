import { getContentByID } from "@/actions/contentsActions";
import ViewContentTop from "@/components/catalogues/ViewContentTop";
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

  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <div className="w-full ">
        <Header />
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Top presentation */}
          <ViewContentTop content={content} />

          {/* Chapiters */}
          <section className="px-4">
            <h2 className="lg:text-4xl text-3xl font-bold tracking-tight underline underline-offset-8">
              Les chapitres
            </h2>
          </section>

          {/* Similaire content*/}
          <section></section>
        </div>
      </div>
    </Suspense>
  );
};

export default ContentPageID;
