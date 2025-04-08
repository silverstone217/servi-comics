"use client";
import { categoryType, statusType, targetType } from "@/types/contentTypes";
import React, { useState } from "react";
import manga7 from "@/public/images/manga7.jpg";
import Image from "next/image";
import { CategoriesData } from "@/utils/data";
import { Button } from "@/components/ui/button";
import TabsForm from "./TabsForm";
import { isEmptyString, returnDataValue } from "@/utils/functions";
import { toast } from "sonner";
import { v4 } from "uuid";
import { storage } from "@/lib/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  addContent,
  addContentImages,
  newContentSecondType,
  newContentType,
} from "@/actions/contentsActions";

const MainModifyContent = () => {
  const [category, setCategory] = useState<categoryType | "">("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [language, setLanguage] = useState("");
  const [target, setTarget] = useState<targetType | "">("");
  const [cover, setCover] = useState<File | null>(null);
  const [isColored, setIsColored] = useState(false);
  const [publishedAt, setPublishedAt] = useState("");
  const [status, setStatus] = useState<statusType | "">("");

  const [loading, setLoading] = useState(false);

  if (!category) {
    return (
      <div className="w-full py-8 flex flex-col gap-4">
        <div className="flex w-full gap-4 md:flex-row md:items-center md:justify-between flex-col mb-4">
          {/* image */}
          <Image
            src={manga7}
            alt="Manga 7"
            width={1000}
            height={800}
            priority
            className="md:flex-1 md:w-fit h-fit md:h-64 lg:h-72 object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1.5 ">
            Choisir le contenu a ajouter
          </h2>
          <p
            className="
          text-sm font-medium tracking-wide leading-relaxed text-gray-500
          "
          >
            Cliquer sur un des boutons afin de valider la selection.
          </p>
        </div>

        {/* categories */}
        <div className="flex gap-4 flex-wrap">
          {CategoriesData.map((catg, idx) => (
            <Button
              key={idx}
              variant={category === catg.value ? "default" : "secondary"}
              onClick={() => setCategory(catg.value as categoryType)}
              className="cursor-pointer"
            >
              {catg.label}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  const sendImagesToFirebase = async () => {
    let imgUrl = "";
    let coverUrl = "";
    try {
      if (!image) {
        return {
          error: true,
          message: "Veuillez choisir une image!",
          imgUrl: imgUrl,
          coverUrl: coverUrl,
        };
      }
      const imgId = v4().toString().replace(/-/g, "");
      const coverRef = ref(storage, `servi-comics/covers/${imgId}`);
      const imageRef = ref(storage, `servi-comics/images/${imgId}`);

      const snapshot = await uploadBytes(imageRef, image);
      // Get the download URL
      imgUrl = await getDownloadURL(snapshot.ref);

      if (!cover) {
        return {
          error: false,
          message: "Image ajoutée!",
          imgUrl,
          coverUrl,
        };
      }
      const coverSnapshot = await uploadBytes(coverRef, cover);
      coverUrl = await getDownloadURL(coverSnapshot.ref);

      return {
        error: false,
        message: "Image ajoutée!",
        imgUrl: imgUrl,
        coverUrl,
      };
    } catch (error) {
      console.log(error);

      return {
        error: true,
        message: "Une erreur est survenue lors de l'envoi des images.",
        imgUrl: imgUrl,
        coverUrl: coverUrl,
      };
    }
  };

  //   submits the content
  const handleSubmit = async () => {
    setLoading(true);
    let imgUrl = "";
    let coverUrl: string | undefined = "";
    try {
      if (!image) {
        toast.error("Veuillez choisir une image!");
        return;
      }
      const formData: newContentType = {
        title,
        description,
        tags,
        language,
        target: target as targetType,
        isColored,
        publishedAt: new Date(publishedAt),
        category: category as categoryType,
        status: status as statusType,
      };

      const myContent = await addContent(formData);
      if (myContent.error) {
        toast.error(myContent.message);
        return;
      }
      const sendImages = await sendImagesToFirebase();
      if (sendImages.error) {
        toast.error(sendImages.message);
        return;
      }
      imgUrl = sendImages.imgUrl;
      coverUrl = sendImages.coverUrl ? sendImages.coverUrl : undefined;

      const formImgs: newContentSecondType = {
        image: imgUrl,
        cover: coverUrl,
        contentId: myContent.contentId,
      };

      const addImages = await addContentImages(formImgs);
      if (addImages.error) {
        toast.error(addImages.message);
        return;
      }

      toast.success("Contenu ajouté avec succès!");
      setTimeout(() => location.reload(), 2000);
    } catch (error) {
      console.log(error);
      if (imgUrl) {
        await deleteObject(ref(storage, imgUrl));
      }
      if (coverUrl) {
        await deleteObject(ref(storage, coverUrl));
      }

      toast.error("Impossible d'effectuer cette action, réessayez plus tard!");
    } finally {
      setTimeout(() => setLoading(false), 3000);
    }
  };

  return (
    <div>
      {/* content */}
      <h2 className="text-3xl font-bold tracking-tight mb-4">
        Ajouter un nouveau{" "}
        {returnDataValue({ data: CategoriesData, value: category })}
      </h2>
      <TabsForm
        category={category}
        setCategory={setCategory}
        loading={loading}
        setLoading={setLoading}
        title={title}
        description={description}
        image={image}
        tags={tags}
        language={language}
        target={target}
        cover={cover}
        setDescription={setDescription}
        setImage={setImage}
        setTags={setTags}
        setLanguage={setLanguage}
        setTarget={setTarget}
        setCover={setCover}
        setTitle={setTitle}
        isColored={isColored}
        setIsColored={setIsColored}
        setPublishedAt={setPublishedAt}
        publishedAt={publishedAt}
        setStatus={setStatus}
        status={status}
      />

      <p
        className="
          text-sm font-medium tracking-wide leading-relaxed text-gray-500
          "
      >
        {`Les champs ayant un * sont obligatoires`}
      </p>
      <div className="flex justify-end gap-4 mt-4">
        <Button
          onClick={() => setCategory("")}
          variant="secondary"
          disabled={loading}
        >
          Annuler
        </Button>
        <Button
          onClick={() => handleSubmit()}
          disabled={
            loading ||
            isEmptyString(title) ||
            isEmptyString(description) ||
            isEmptyString(language) ||
            image === null ||
            isEmptyString(target) ||
            tags.length < 1 ||
            isEmptyString(status)
          }
        >
          {loading ? "en cours..." : "Modifier"}
        </Button>
      </div>
    </div>
  );
};

export default MainModifyContent;
