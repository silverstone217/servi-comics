"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categoryType, statusType, targetType } from "@/types/contentTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { StatusData, TagsData, TargetData } from "@/utils/data";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  category: categoryType | string;
  loading: boolean;
  language: string;
  title: string;
  description: string;
  image: File | null;
  tags: string[];
  target: targetType | "";
  cover: File | null;
  isColored: boolean;
  publishedAt: string;
  status: statusType | "";

  setCategory: React.Dispatch<React.SetStateAction<"" | categoryType>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setTarget: React.Dispatch<React.SetStateAction<targetType | "">>;
  setCover: React.Dispatch<React.SetStateAction<File | null>>;
  setIsColored: React.Dispatch<React.SetStateAction<boolean>>;
  setPublishedAt: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<"" | statusType>>;
}

const TabsForm = ({
  category,
  loading,
  language,
  title,
  description,
  image,
  tags,
  target,
  cover,
  setDescription,
  setTitle,
  setImage,
  setTags,
  setLanguage,
  setTarget,
  setCover,
  setIsColored,
  isColored,
  setPublishedAt,
  publishedAt,
  status,
  setStatus,
}: Props) => {
  return (
    <Tabs defaultValue="principale" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="principale">Principale</TabsTrigger>
        <TabsTrigger value="secondaire">secondaire</TabsTrigger>
        <TabsTrigger value="images">Images</TabsTrigger>
      </TabsList>
      <TabsContent value="principale" className="w-full">
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
        />
      </TabsContent>
      <TabsContent value="secondaire">
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
        />
      </TabsContent>
      <TabsContent value="images">
        <AddImages
          image={image}
          cover={cover}
          setImage={setImage}
          setCover={setCover}
          loading={loading}
          category={category}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TabsForm;

type PrincipaleTypes = {
  category: categoryType | string;
  title: string;
  description: string;
  loading: boolean;
  target: targetType | "";
  status: statusType | "";

  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setTarget: React.Dispatch<React.SetStateAction<targetType | "">>;
  setStatus: React.Dispatch<React.SetStateAction<"" | statusType>>;
};
const AddPrincipaleInfo = ({
  setDescription,
  setTitle,
  setTarget,
  description,
  title,
  target,
  loading,
  setStatus,
  status,
}: PrincipaleTypes) => {
  return (
    <div className="w-full flex flex-col gap-4 py-4">
      {/* Title */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="title">Titre *</Label>
        <Input
          type="title"
          id="title"
          placeholder="ex: Naruto Shippudden"
          value={title}
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
          value={description}
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
          value={target}
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

  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setIsColored: React.Dispatch<React.SetStateAction<boolean>>;
  setPublishedAt: React.Dispatch<React.SetStateAction<string>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};
const AddSecondaryInfo = ({
  language,
  loading,
  isColored,
  publishedAt,
  tags,
  setLanguage,
  setIsColored,
  setPublishedAt,
  setTags,
}: SecondaryTypes) => {
  return (
    <div className="w-full flex flex-col gap-4 py-4">
      {/* Tags */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="tags">Tags(Genre)</Label>
        <div className="flex w-full items-center gap-1.5 flex-wrap">
          {TagsData.map((tg, idx) => (
            <Button
              key={idx}
              disabled={loading}
              onClick={() => {
                setTags((prevTags) => {
                  if (prevTags.includes(tg.value)) {
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
          value={language}
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
        <Label htmlFor="publishedAt">Date de publication</Label>
        <Input
          type="date"
          id="publishedAt"
          value={publishedAt}
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
          checked={isColored}
          disabled={loading}
          onCheckedChange={(val) => setIsColored(val)}
        />
      </div>
    </div>
  );
};

// Images
type ImagesTypes = {
  category: categoryType | string;
  loading: boolean;

  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  image: File | null;
  setCover: React.Dispatch<React.SetStateAction<File | null>>;
  cover: File | null;
};
const AddImages = ({
  image,
  cover,
  loading,
  setImage,
  setCover,
}: ImagesTypes) => {
  return (
    <div className="w-full flex flex-col gap-4 py-4">
      {/* Images */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="image">Image *</Label>
        {!image ? (
          <Input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => {
              const img = e.target.files;
              if (img) {
                setImage(img[0]);
                return;
              }
              setImage(null);
            }}
            disabled={loading}
            required
            className="w-full text-sm font-medium"
            autoComplete="image"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        ) : (
          <Button
            onClick={() => setImage(null)}
            variant="destructive"
            className="max-w-44"
            disabled={loading}
          >
            {`Supprimer l'image`}
          </Button>
        )}

        {image && (
          <div className="relative">
            <Image
              src={URL.createObjectURL(image)}
              alt="Image"
              width={600}
              height={600}
              className="object-cover rounded-md h-52 w-44 brightness-75"
            />
          </div>
        )}
      </div>

      {/* Cover */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="cover">Couverture </Label>
        {!cover ? (
          <Input
            type="file"
            id="cover"
            accept="image/*"
            onChange={(e) => {
              const img = e.target.files;
              if (img) {
                setCover(img[0]);
                return;
              }
              setCover(null);
            }}
            disabled={loading}
            required
            className="w-full text-sm font-medium"
            autoComplete="cover"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        ) : (
          <Button
            onClick={() => setCover(null)}
            variant="destructive"
            className="max-w-44"
            disabled={loading}
          >
            {`Supprimer la couverture`}
          </Button>
        )}

        {cover && (
          <div className="relative">
            <Image
              src={URL.createObjectURL(cover)}
              alt="Couverture"
              width={600}
              height={600}
              className="object-cover rounded-md h-72 w-full brightness-75"
            />
          </div>
        )}
      </div>
    </div>
  );
};
