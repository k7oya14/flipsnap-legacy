// This file contains type definitions for your data.

export enum UserRelationship {
  Following = "Following",
  Follower = "Follower",
  Mutual = "Mutual",
  None = "None",
  NoSession = "NoSession",
}

export type sessionUser = {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

export type Post = {
  author?: {
    relationship: UserRelationship;
    image: string | null;
    name: string | null;
    username: string | null;
  };
  id: string;
  authorId: string;
  imgFront: string;
  imgBack: string;
  caption: string;
  createdAt: Date;
};
