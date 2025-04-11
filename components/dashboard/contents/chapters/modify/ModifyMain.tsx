"use client";
import { ModChapType, modifyChap } from "@/actions/ChaptersActions";
import AlertComponent from "@/components/AlertComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/hooks/UserAuth";
import { isEmptyString } from "@/utils/functions";
import { Chapter, Content } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  content: Content;
  chapter: Chapter;
};

const ModifyMain = ({ chapter }: Props) => {
  const [title, setTitle] = useState(chapter.title ?? "");
  const [order, setOrder] = useState(chapter.order.toString() ?? "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const user = useCurrentUser();

  const handleModifyChap = async () => {
    setLoading(true);
    try {
      const intOrder = parseFloat(order);

      if (typeof intOrder !== "number") {
        toast.error("Veuillez entrer un nombre pour Order!");
        return;
      }

      const formData: ModChapType = {
        contentId: chapter.contentId,
        title: title.trim().toLowerCase(),
        order: intOrder,
        chapterId: chapter.id,
      };

      const result = await modifyChap(formData);

      if (result?.error) {
        toast.error(result.message);
        return;
      }

      toast.success("Chapitre ajouté!");
      setTitle("");
      setOrder("");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Oops! Une erreur est survenue!");
    } finally {
      setTimeout(() => setLoading(false), 3000);
    }
  };

  if (!chapter || !user) return null;

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-2xl font-bold tracking-tight text-balance">
        Modifier le chapitre
      </h2>
      <AlertComponent
        text="Les champs ayant * sont obligatoires."
        title=""
        type="info"
      />

      {/* Form */}
      <form
        className="w-full flex flex-col gap-4 mt-1.5"
        onSubmit={(e) => {
          e.preventDefault();
          handleModifyChap();
        }}
      >
        {/* Title */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Titre</Label>
          <Input
            type="text"
            id="title"
            placeholder="ex: La fin de temps"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            maxLength={30}
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Order */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="order">Ordre ou numero *</Label>
          <Input
            type="text"
            id="order"
            placeholder="ex: 0 ou 1.5"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            defaultValue={order}
            onChange={(e) => setOrder(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="w-full flex items-center justify-end gap-2.5">
          <Button
            type="submit"
            disabled={
              loading ||
              isEmptyString(order) ||
              (order === chapter.order.toString() && title === chapter.title)
            }
          >
            {loading ? "En cours... " : "Modifier"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ModifyMain;
