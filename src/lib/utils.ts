import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Post } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage :
// const data = await fetchLatestPosts(1, null);
// const cursorPostId = useCursor(data);
// const data2 = await fetchMoreLatestPosts(1, null,cursorPostId);
export function useCursor(data: Post[]) {
  return data[data.length - 1].id;
}
