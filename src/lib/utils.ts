import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useCursorById() {
  const cursorById = <T extends { id: string }>(data: T[]): string => {
    return data[0] ? data[data.length - 1].id : "";
  };
  return { cursorById };
}
