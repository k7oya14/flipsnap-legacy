// This file contains type definitions for your data.

export type Post = {
  id: string;
  authorId: string;
  imgFront: string;
  imgBack: string;
  caption: string;
  createdAt: Date;
}

export type sessionUser = {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};
