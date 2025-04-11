"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Content } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/UserAuth";
import { toast } from "sonner";
import { addNewChap, addNewChapType } from "@/actions/ChaptersActions";
import { useRouter } from "next/navigation";
import { isEmptyString } from "@/utils/functions";

type Props = {
  content: Content;
};

const ButtonAddNew = ({ content }: Props) => {
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const user = useCurrentUser();

  const handleAddNewChap = async () => {
    setLoading(true);
    try {
      const intOrder = parseFloat(order);

      if (typeof intOrder !== "number") {
        toast.error("Veuillez entrer un nombre pour Order!");
        return;
      }

      const formData: addNewChapType = {
        contentId: content.id,
        title: title.trim().toLowerCase(),
        order: intOrder,
      };

      const result = await addNewChap(formData);

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

  if (!user) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 justify-center">
          <Plus className="shrink-0 size-6" />
          <span> Nouveau chapitre</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouveau chapitre</DialogTitle>
          <DialogDescription>
            Tous les champs ayant un <strong>*</strong> sont obligatoires.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form
          className="w-full flex flex-col gap-4 mt-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddNewChap();
          }}
        >
          {/* Title */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="title">Titre</Label>
            <Input
              type="text"
              id="title"
              placeholder="ex: La fin de temps"
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              maxLength={30}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Order */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="order">Ordre ou numero *</Label>
            <Input
              type="text"
              id="order"
              placeholder="ex: 0 ou 1.5"
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Buttons submit */}
          <div className="w-full flex items-center justify-end gap-2.5">
            <DialogClose asChild>
              <Button type="button" disabled={loading} variant={"secondary"}>
                Annuler
              </Button>
            </DialogClose>

            <Button type="submit" disabled={loading || isEmptyString(order)}>
              {loading ? "En cours... " : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonAddNew;
