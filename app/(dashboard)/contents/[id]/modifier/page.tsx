import { getUser } from "@/actions/authAction";
import { getContentByID } from "@/actions/contentsActions";
import AlertComponent from "@/components/AlertComponent";
import MainModify from "@/components/dashboard/contents/modify/MainModify";
import { CategoriesData } from "@/utils/data";
import { returnDataValue } from "@/utils/functions";
import { redirect } from "next/navigation";
import React from "react";
type Props = {
  params: Promise<{ id: string }>;
};
const ModifyContentID = async ({ params }: Props) => {
  const { id } = await params;
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  if (!id) {
    redirect("/contents");
  }

  const content = await getContentByID(id);

  if (!content) {
    redirect("/contents");
  }

  if (user.id !== content.authorId) {
    redirect("/contents");
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight text-balance">
          Modifier votre{" "}
          {returnDataValue({ data: CategoriesData, value: content.category })}
        </h2>
        <AlertComponent
          type="info"
          text="Les champs en * sont obligatoires."
          title=""
        />
      </div>
      <MainModify content={content} />
    </div>
  );
};

export default ModifyContentID;
