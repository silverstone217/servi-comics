"use client";
import { SelectOptionType } from "@/types/contentTypes";
import React from "react";
import { Input } from "@/components/ui/input";
import { ListFilter, Search } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CategoriesData,
  LanguagesData,
  TargetData,
  StatusData,
  TagsData,
} from "@/utils/data";
import { Label } from "@/components/ui/label";

type Props = {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setTarget: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
  language: string;
  target: string;
  category: string;
  status: string;
  tag: string;
};

const HeaderFilter = ({
  setSearchText,
  setLanguage,
  setTarget,
  setCategory,
  setStatus,
  searchText,
  language,
  target,
  category,
  status,
  setTag,
  tag,
}: Props) => {
  return (
    <div className="w-full flex items-center  gap-4">
      {/* input */}
      <div className="relative w-full max-w-lg">
        <Search className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
        <Input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Rechercher..."
          className="pl-8" // Ajoute un padding gauche pour éviter que le texte ne chevauche l'icône
        />
      </div>

      {/* filters */}
      <FilterTabs
        setSearchText={setSearchText}
        setLanguage={setLanguage}
        setTarget={setTarget}
        setCategory={setCategory}
        setStatus={setStatus}
        searchText={searchText}
        language={language}
        target={target}
        category={category}
        status={status}
        tag={tag}
        setTag={setTag}
      />
    </div>
  );
};

export default HeaderFilter;

const FilterTabs = ({
  setSearchText,
  setLanguage,
  setTarget,
  setCategory,
  setStatus,
  language,
  target,
  category,
  status,
  tag,
  setTag,
}: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          className="flex items-center gap-2 justify-center"
        >
          <span className="hidden md:block">Filtres</span>
          <ListFilter className="shrink-0 size-8" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="overflow-x-hidden overflow-y-auto w-[90%] h-full
      transition-all duration-300 ease-in-out pb-4
      "
      >
        <SheetHeader>
          <SheetTitle>Filtres</SheetTitle>
          <SheetDescription>
            Choisissez vos filtres pour affiner votre recherche.
          </SheetDescription>
        </SheetHeader>
        {/* filtres */}
        <div className="flex flex-col gap-5 w-full px-4 flex-1 pb-4 border-b">
          {/* category */}
          <SelectOptions
            data={CategoriesData}
            value={category}
            setValue={setCategory}
            placeholder="Catégorie"
          />
          {/* tag */}
          <SelectOptions
            data={TagsData}
            value={tag}
            setValue={setTag}
            placeholder="Genre"
          />

          {/* language */}
          <SelectOptions
            data={LanguagesData}
            value={language}
            setValue={setLanguage}
            placeholder="Langue"
          />

          {/* target */}
          <SelectOptions
            data={TargetData}
            value={target}
            setValue={setTarget}
            placeholder="Cible"
          />
          {/* status */}
          <SelectOptions
            data={StatusData}
            value={status}
            setValue={setStatus}
            placeholder="Statut"
          />
        </div>
        {/* buttons */}
        <div className="flex justify-end gap-2 w-full px-4">
          <SheetClose asChild>
            <Button
              variant={"secondary"}
              onClick={() => {
                setSearchText("");
                setLanguage("all");
                setTarget("all");
                setCategory("all");
                setStatus("all");
                setTag("all");
              }}
            >
              Réinitialiser
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button onClick={() => console.log("Apply filters")}>
              Appliquer
            </Button>
          </SheetClose>
          {/* button close */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

type SelectOptionsType = {
  data: SelectOptionType[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
};
const SelectOptions = ({
  data,
  value,
  setValue,
  placeholder,
}: SelectOptionsType) => {
  return (
    <div className="grid gap-1.5 w-full">
      <Label htmlFor={placeholder}>{placeholder}</Label>
      <Select value={value} onValueChange={(val) => setValue(val)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {data.map((option, idx) => (
            <SelectItem key={idx} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
          {/* All */}
          <SelectItem key="all" value="all">
            Tout
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
