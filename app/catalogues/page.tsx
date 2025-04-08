import { getContents } from "@/actions/contentsActions";
import MainComponent from "@/components/catalogues/MainComponent";
import Header from "@/components/home/Header";
import React from "react";

const CatalogsPage = async () => {
  const contents = await getContents();
  return (
    <div>
      <Header />
      <MainComponent contents={contents} />
    </div>
  );
};

export default CatalogsPage;
