import { getContentByID } from "@/actions/contentsActions";
import { redirect } from "next/navigation";
import React from "react";

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

  return <div>ContentPage ID: {id}</div>;
};

export default ContentPageID;
