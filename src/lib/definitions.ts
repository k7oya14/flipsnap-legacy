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
