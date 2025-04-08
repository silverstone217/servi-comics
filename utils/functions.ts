import { statusType } from "@/types/contentTypes";

export const isEmptyString = (value: string) => {
  return value.replace(/ /g, "") === "";
};

// slug formatting
export function createSlug(str: string): string {
  if (!str) {
    return ""; // Gérer le cas où la chaîne est vide ou null
  }

  const slug = str
    .normalize("NFD") // Normaliser pour supprimer les accents
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les diacritiques
    .toLowerCase() // Mettre en minuscule
    .replace(/[^a-z0-9 -]/g, "") // Supprimer les caractères non alphanumériques, tirets et espaces
    .trim() // Supprimer les espaces au début et à la fin
    .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
    .replace(/-+/g, "-"); // Remplacer les tirets multiples par un seul tiret

  return slug;
}

type ReturnDataValueType = {
  value: string;
  data: { value: string; label: string }[];
};
export function returnDataValue({ data, value }: ReturnDataValueType) {
  return data.find((item) => item.value === value)?.label || "";
}

export const returnColorByStatus = (status: statusType): string => {
  switch (status) {
    case "hiatus":
      return "#CC8400"; // Orange

    case "finished":
      return "#4B5563"; // Bleu-gris sombre (hex pour Tailwind `gray-600`)

    default:
      return "#FFFFFF"; // Blanc
  }
};
