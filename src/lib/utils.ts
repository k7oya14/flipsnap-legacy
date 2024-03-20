import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Post } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage :
// const data = await fetchLatestPost(12);
// const cursorId = useCursorId(data);
// const data2 = await fetchMoreLatestPost({ take: 12, cursorId });
export function useCursorId(data: Post[]) {
  return data[data.length - 1].id;
}
