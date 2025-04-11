import { getChapterById } from "@/actions/ChaptersActions";
import { getContentByID } from "@/actions/contentsActions";
import ModifyMain from "@/components/dashboard/contents/chapters/modify/ModifyMain";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ chapterId: string; id: string }>;
};

const ChapterIdPage = async ({ params }: Props) => {
  const { id, chapterId } = await params;

  if (!id || !chapterId) {
    redirect("/catalogues");
  }

  const content = await getContentByID(id);
  const chapter = await getChapterById(chapterId);

  if (!content || !chapter) {
    redirect("/catalogues");
  }

  return (
    <div className="w-full ">
      {/* Chapter Top section */}
      <section className="w-full max-w-7xl mx-auto px-4">
        <ModifyMain chapter={chapter} content={content} />
      </section>

      {/* Pages */}
      <section className="w-full max-w-7xl mx-auto px-4 mt-6">
        <div>
          <h2>Les pages</h2>
        </div>
      </section>
    </div>
  );
};

export default ChapterIdPage;
