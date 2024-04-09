export type PageStatePostInfo = {
  cursorPostId: string;
  postLimit: boolean;
};

export const initialPageStatePostInfo = {
  cursorPostId: "",
  postLimit: false,
} satisfies PageStatePostInfo;

export const pathPostInfo = "/";
