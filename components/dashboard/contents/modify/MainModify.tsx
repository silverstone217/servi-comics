"use client";
import {
  deleteMyContent,
  modifyContentFirstPart,
  modifyContentFirstPartType,
  modifyContentSecondPart,
  modifyContentSecondPartType,
  updateCoverServer,
} from "@/actions/contentsActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { storage } from "@/lib/firebase";
import { categoryType, targetType, statusType } from "@/types/contentTypes";
import { CategoriesData, StatusData, TagsData, TargetData } from "@/utils/data";
import { areArraysEqual, isEmptyString } from "@/utils/functions";
import { Content } from "@prisma/client";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { v4 } from "uuid";

type Props = {
  content: Content;
};

const MainModify = ({ content }: Props) => {
  const [category, setCategory] = useState<categoryType | "">(
    (content.category as categoryType) ?? ""
  );
  const [title, setTitle] = useState(content.title ?? "");
  const [description, setDescription] = useState(content.description ?? "");
  const [image, setImage] = useState<string>(content.image ?? "");
  const [tags, setTags] = useState<string[]>(content.tags ?? []);
  const [language, setLanguage] = useState(content.language ?? "");
  const [target, setTarget] = useState<targetType | "">(
    (content.target as targetType) ?? ""
  );
  const [cover, setCover] = useState(content.cover ?? "");
  const [isColored, setIsColored] = useState(content.isColored ?? false);
  const [publishedAt, setPublishedAt] = useState(
    content.publishedAt
      ? `${content.publishedAt.getFullYear()}-${String(
          content.publishedAt.getMonth() + 1
        ).padStart(2, "0")}-${String(content.publishedAt.getDate()).padStart(
          2,
          "0"
        )}`
      : ""
  );

  const [status, setStatus] = useState<statusType | "">(
    (content.status as statusType) ?? ""
  );

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteContent = async () => {
    setLoading(true);
    try {
      const result = await deleteMyContent(content.id);
      if (result.error) {
        toast.error(result.message);
        return;
      }

      if (content.image) {
        const imgUrl = ref(storage, content.image);
        await deleteObject(imgUrl);
      }

      if (content.cover) {
        const imgUrl = ref(storage, content.cover);
        await deleteObject(imgUrl);
      }

      toast.success(result.message);

      setTimeout(() => router.refresh(), 2000);
    } catch (error) {
      console.log(error);
      toast.error("Impossible de continuer cette action!");
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <div className="px-4 mx-auto max-w-7xl flex flex-col gap-6 mt-6 pb-6">
      {/* btn */}
      <div className="w-full flex items-center gap-2.5  mb-2">
        {/* add chapters */}
        <Button asChild disabled={loading}>
          <Link href={"#"}>Ajout des chapitres</Link>
        </Button>
        <Button
          variant={"destructive"}
          onClick={deleteContent}
          disabled={loading}
        >
          {loading ? "En cours..." : "Supprimer"}
        </Button>
      </div>

      <AddPrincipaleInfo
        category={category}
        setDescription={setDescription}
        setTitle={setTitle}
        setTarget={setTarget}
        description={description}
        title={title}
        target={target}
        loading={loading}
        setStatus={setStatus}
        status={status}
        setCategory={setCategory}
        contentId={content.id}
        content={content}
      />

      <AddSecondaryInfo
        language={language}
        setLanguage={setLanguage}
        isColored={isColored}
        setIsColored={setIsColored}
        setPublishedAt={setPublishedAt}
        publishedAt={publishedAt}
        loading={loading}
        category={category}
        tags={tags}
        setTags={setTags}
        contentId={content.id}
        content={content}
      />
      <AddImages
        image={image}
        cover={cover}
        setImage={setImage}
        setCover={setCover}
        loading={loading}
        category={category}
        contentId={content.id}
        content={content}
      />
    </div>
  );
};

export default MainModify;

type PrincipaleTypes = {
  category: categoryType | string;
  title: string;
  description: string;
  loading: boolean;
  target: targetType | "";
  status: statusType | "";
  contentId: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setTarget: React.Dispatch<React.SetStateAction<targetType | "">>;
  setStatus: React.Dispatch<React.SetStateAction<"" | statusType>>;
  setCategory: React.Dispatch<React.SetStateAction<"" | categoryType>>;
  content: Content;
};

const AddPrincipaleInfo = ({
  setDescription,
  setTitle,
  setTarget,
  description,
  title,
  target,
  setStatus,
  status,
  category,
  setCategory,
  contentId,
  content,
}: PrincipaleTypes) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const modifyPrincipalInfo = async () => {
    setLoading(true);
    try {
      const formData: modifyContentFirstPartType = {
        title: title.trim().toLowerCase(),
        description: description.trim(),
        target: target as targetType,
        status: status as statusType,
        category: category as categoryType,
        contentId: contentId,
      };

      const result = await modifyContentFirstPart(formData);

      if (result.error) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      setTimeout(() => router.refresh(), 2000);
    } catch (error) {
      console.log(error);
      toast.error("Impossible de continuer cette action!");
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <div className="p-2 border-2 shadow rounded">
      {/* container */}
      <div className="flex flex-col gap-4">
        <h2>Info principale</h2>

        {/* Title */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Titre *</Label>
          <Input
            type="title"
            id="title"
            placeholder="ex: Naruto Shippudden"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            maxLength={100}
            required
            className="w-full text-sm font-medium"
            autoComplete="title"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>

        {/* Description */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            rows={3}
            placeholder="Décrivez votre contenu ici"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            maxLength={500}
            required
            className="w-full text-sm font-medium min-h-16 max-h-36"
            autoComplete="description"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>

        {/* Target */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="target">Cible *</Label>

          <Select
            onValueChange={(val) => setTarget(val as targetType)}
            disabled={loading}
            defaultValue={target}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir le public cible" />
            </SelectTrigger>
            <SelectContent>
              {TargetData.map((tg, idx) => (
                <SelectItem key={idx} value={tg.value}>
                  {tg.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* category */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="target">Catégorie *</Label>
          <Select
            onValueChange={(val) => setCategory(val as categoryType)}
            disabled={loading}
            value={category}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir le public cible" />
            </SelectTrigger>
            <SelectContent>
              {CategoriesData.map((tg, idx) => (
                <SelectItem key={idx} value={tg.value}>
                  {tg.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="target">Status *</Label>
          <Select
            onValueChange={(val) => setStatus(val as statusType)}
            disabled={loading}
            value={status}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir le public cible" />
            </SelectTrigger>
            <SelectContent>
              {StatusData.map((tg, idx) => (
                <SelectItem key={idx} value={tg.value}>
                  {tg.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* button */}
        <div className="flex w-full items-center gap-2 justify-end">
          <Button
            onClick={modifyPrincipalInfo}
            disabled={
              loading ||
              isEmptyString(title) ||
              isEmptyString(description) ||
              !target ||
              !status ||
              !category ||
              (content.title === title &&
                content.description === description &&
                content.target === target &&
                content.status === status &&
                content.category === category)
            }
          >
            {loading ? "En cours..." : "Modifier"}
          </Button>
        </div>
      </div>
    </div>
  );
};

// secondaryInformation
type SecondaryTypes = {
  category: categoryType | string;
  language: string;
  loading: boolean;
  isColored: boolean;
  publishedAt: string;
  tags: string[];
  contentId: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setIsColored: React.Dispatch<React.SetStateAction<boolean>>;
  setPublishedAt: React.Dispatch<React.SetStateAction<string>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  content: Content;
};
const AddSecondaryInfo = ({
  language,
  isColored,
  publishedAt,
  tags,
  setLanguage,
  setIsColored,
  setPublishedAt,
  setTags,
  content,
  contentId,
}: SecondaryTypes) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const modifySecondaryInfo = async () => {
    setLoading(true);
    try {
      const formData: modifyContentSecondPartType = {
        isColored,
        language,
        publishedAt: new Date(publishedAt),
        tags,
        contentId: contentId,
      };

      const result = await modifyContentSecondPart(formData);

      if (result.error) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      setTimeout(() => router.refresh(), 2000);
    } catch (error) {
      console.log(error);
      toast.error("Impossible de continuer cette action!");
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <div className="p-2 border-2 shadow rounded">
      {/* container */}
      <div className="flex flex-col gap-4">
        <h2>Info Secondaire</h2>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="tags">Tags(Genre)</Label>
          <div className="flex w-full items-center gap-1.5 flex-wrap">
            {TagsData.map((tg, idx) => (
              <Button
                key={idx}
                disabled={loading}
                onClick={() => {
                  setTags((prevTags) => {
                    if (prevTags.includes(tg.value as targetType)) {
                      // Supprimer le tag existant
                      return prevTags.filter((t) => t !== tg.value);
                    } else if (prevTags.length < 5) {
                      // Ajouter un nouveau tag seulement si la limite n'est pas atteinte
                      return [...prevTags, tg.value];
                    }
                    // Retourner les tags inchangés si la limite est atteinte
                    return prevTags;
                  });
                }}
                variant={tags.includes(tg.value) ? "default" : "secondary"}
              >
                {tg.label}
              </Button>
            ))}
          </div>

          <p
            className="
          text-sm
          text-gray-500
        "
          >
            {"Vous ne pouvez pas ajouter plus de 5 tags(genres)"}
          </p>
        </div>

        {/* Language */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="language">Langue *</Label>
          <Select
            onValueChange={(val) => setLanguage(val as string)}
            disabled={loading}
            defaultValue={language}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir la langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">Anglais</SelectItem>
              <SelectItem value="es">Espagnol</SelectItem>
              <SelectItem value="pt">Portugais</SelectItem>
              <SelectItem value="lin">Lingala</SelectItem>
              <SelectItem value="jp">Japonais</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* PublishedAt */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="publishedAt">Date de publication *</Label>
          <Input
            type="date"
            id="publishedAt"
            defaultValue={publishedAt}
            disabled={loading}
            onChange={(e) => setPublishedAt(e.target.value)}
            className="w-full text-sm font-medium"
            autoComplete="publishedAt"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>

        {/* Color */}
        <div className="flex  w-full items-center gap-1.5">
          <Label htmlFor="isColored">En couleur: </Label>
          <Switch
            id="isColored"
            defaultChecked={isColored}
            disabled={loading}
            onCheckedChange={(val) => setIsColored(val)}
          />
        </div>

        {/* button */}
        <div className="flex w-full items-center gap-2 justify-end">
          <Button
            onClick={modifySecondaryInfo}
            disabled={
              loading ||
              tags.length < 1 ||
              !publishedAt ||
              !language ||
              (areArraysEqual(tags, content.tags) &&
                content.publishedAt.toLocaleDateString() ===
                  new Date(publishedAt).toLocaleDateString() &&
                isColored === content.isColored &&
                content.language === language)
            }
          >
            {loading ? "En cours..." : "Modifier"}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Images
type ImagesTypes = {
  category: categoryType | string;
  loading: boolean;
  contentId: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setCover: React.Dispatch<React.SetStateAction<string>>;
  cover: string;
  content: Content;
};
const AddImages = ({ image, cover, contentId }: ImagesTypes) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [newImg, setNewImg] = useState<File | null>(null);
  const [newCover, setNewCover] = useState<File | null>(null);

  const updateImage = async () => {
    setLoading(true);
    try {
      if (!newImg) {
        toast.error("Aucune image n'a été sélectionnée!");
        return;
      }
      const imageRef = ref(storage, image);

      const snapshot = await uploadBytes(imageRef, newImg);
      // Get the download URL
      await getDownloadURL(snapshot.ref);

      toast.success("Image a été modifiée avec succès!");
      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Impossible de continuer cette action!");
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const updateCover = async () => {
    setLoading(true);
    try {
      if (!newCover) {
        toast.error("Aucune image n'a été sélectionnée!");
        return;
      }
      const imgId = v4().toString().replace(/-/g, "");
      const coverRef = ref(storage, `servi-comics/covers/${imgId}`);
      const imageRef = cover !== "" ? ref(storage, cover) : coverRef;

      const snapshot = await uploadBytes(imageRef, newCover);
      // Get the download URL
      const coverUrl = await getDownloadURL(snapshot.ref);

      const result = await updateCoverServer({ contentId, cover: coverUrl });

      if (result.error) {
        toast.error(result.message);
        return;
      }

      toast.success("Image de couverture a été modifiée avec succès!");
      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Impossible de continuer cette action!");
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <div className="p-2 border-2 shadow rounded">
      {/* container */}
      <div className="flex flex-col gap-4">
        <h2>Image et cover</h2>

        {/* Image */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="image">Image *</Label>
          {newImg ? (
            <Image
              src={URL.createObjectURL(newImg)}
              alt="image"
              width={1000}
              height={800}
              priority
              className="w-64 h-72 object-cover mx-auto md:mx-0"
            />
          ) : image ? (
            <Image
              src={image}
              alt="image"
              width={1000}
              height={800}
              priority
              className="w-56 h-72 object-cover mx-auto md:mx-0"
            />
          ) : null}

          <Input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => {
              const img = e.target.files;
              if (img) {
                setNewImg(img[0]);
                return;
              }
              setNewImg(null);
            }}
            disabled={loading}
            required
            className="w-full text-sm font-medium"
            autoComplete="image"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {/* button */}
          <div className="flex w-full items-center gap-2 justify-end">
            <Button disabled={loading || !newImg} onClick={updateImage}>
              Modifier
            </Button>
          </div>
        </div>

        {/* Cover */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="image">Couverture</Label>
          {newCover ? (
            <Image
              src={URL.createObjectURL(newCover)}
              alt="image"
              width={1600}
              height={1000}
              priority
              className="w-full h-60 object-cover mx-auto md:mx-0"
            />
          ) : cover ? (
            <Image
              src={cover}
              alt="cover"
              width={1600}
              height={1000}
              priority
              className="w-full h-60 object-cover mx-auto md:mx-0"
            />
          ) : null}

          <Input
            type="file"
            id="cover"
            accept="image/*"
            onChange={(e) => {
              const img = e.target.files;
              if (img) {
                setNewCover(img[0]);
                return;
              }
              setNewCover(null);
            }}
            disabled={loading}
            required
            className="w-full text-sm font-medium"
            autoComplete="image"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {/* button */}
          <div className="flex w-full items-center gap-2 justify-end">
            <Button disabled={loading || !newCover} onClick={updateCover}>
              Modifier
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
