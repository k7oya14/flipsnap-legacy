// This file contains type definitions for your data.

export enum UserRelationship {
  Following = "Following",
  Follower = "Follower",
  Mutual = "Mutual",
  None = "None",
  Me = "Me",
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

export type UserInfo = {
  relationship: UserRelationship | undefined;
  _count?:
    | {
        followers: number;
        follows: number;
        posts: number;
      }
    | undefined;
  id?: string | undefined;
  username?: string | null | undefined;
  created_at?: Date | undefined;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  name?: string | null;
  bio?: string;
};
