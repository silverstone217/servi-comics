"use client";
import { useCurrentUser } from "@/hooks/UserAuth";
import { Chapter, Content } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { FilePenLine, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteChapByIds } from "@/actions/ChaptersActions";
import { useRouter } from "next/navigation";

type Props = {
  chapters: Chapter[];
  content: Content;
};

const ChapterList = ({ chapters, content }: Props) => {
  if (chapters.length < 1) {
    return (
      <div className="w-full flex items-center justify-center md:justify-start text-gray-500">
        <p>Pas de chapitre disponible.</p>
      </div>
    );
  }
  return (
    <div className="w-full grid">
      {chapters.map((chapter) => (
        <ChapiterItem chapter={chapter} key={chapter.id} content={content} />
      ))}
    </div>
  );
};

export default ChapterList;

const ChapiterItem = ({
  chapter,
  content,
}: {
  chapter: Chapter;
  content: Content;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const user = useCurrentUser();

  const handleDeleteChap = async () => {
    setLoading(true);
    try {
      const result = await deleteChapByIds(content.id, chapter.id);

      if (result?.error) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Oops! Une erreur est survenue!");
    } finally {
      setTimeout(() => setLoading(false), 3000);
    }
  };
  return (
    <div className="py-3 border-b">
      <div className="w-full flex flex-col gap-2">
        <Link
          href={"#"}
          className="w-full flex items-center gap-2 font-semibold text-sm text-balance capitalize"
        >
          <span>Chapitre {chapter.order}</span>
          {chapter.title && <span>{chapter.title}</span>}
        </Link>

        <div className="w-full flex items-center gap-2.5">
          <p className="text-xs text-gray-500 mr-2">
            {new Date(chapter.createdAt).toLocaleDateString("fr-Fr", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </p>

          {/* modify */}
          {user && user.id === content.authorId && (
            <button
              className="py-1 px-1.5 rounded bg-secondary cursor-pointer disabled:opacity-70"
              title="Modify"
              disabled={loading}
              onClick={() =>
                router.push(`/contents/${chapter.contentId}/${chapter.id}`)
              }
            >
              <FilePenLine className="size-4" />
            </button>
          )}

          {/* Delete */}
          {user && user.id === content.authorId && (
            <button
              className="py-1 px-1.5 rounded bg-secondary cursor-pointer disabled:opacity-70"
              title="Modify"
              disabled={loading}
              onClick={handleDeleteChap}
            >
              <Trash2 className="size-4" color="tomato" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
