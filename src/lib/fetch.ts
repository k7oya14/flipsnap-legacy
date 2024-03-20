"use server";

import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "./prismaClient";

export async function fetchUserByUsername(username: string) {
  noStore();
  try {
    const data = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user info by username.");
  }
}

export async function fetchUserById(userId: string) {
  noStore();
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user info by userId.");
  }
}

export async function fetchPost(postId: string) {
  noStore();
  try {
    const data = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    const author = data ? await fetchUserById(data?.authorId) : null;
    const post = data
      ? {
          ...data,
          author: {
            username: author?.username ?? "",
            avatar: author?.image ?? undefined,
            name: author?.name ?? "",
            isMutualFollow: false,
          },
        }
      : null;
    return post;
  } catch (error) {
    throw new Error("Failed to fetch a post.");
  }
}

// Fetch Posts API Usage at infinite scroll:
//
// const data = await fetchLatestPosts(1, null);
// const cursorPostId = useCursor(data);
// const data2 = await fetchMoreLatestPosts(1, null,cursorPostId);
//

export async function fetchLatestPosts(take: number, myId: string | null) {
  noStore();
  try {
    const data = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take,
    });
    if (myId) {
      const posts = await Promise.all(
        data.map(async (post) => {
          const author = await fetchUserById(post.authorId);
          return {
            ...post,
            author: {
              username: author?.username ?? "",
              avatar: author?.image ?? undefined,
              name: author?.name ?? "",
              isMutualFollow: true, // TODO: fix value to be dynamic by func
            },
          };
        })
      );
      return posts;
    } else {
      const posts = await Promise.all(
        data.map(async (post) => {
          const author = await fetchUserById(post.authorId);
          return {
            ...post,
            author: {
              username: author?.username ?? "",
              avatar: author?.image ?? undefined,
              name: author?.name ?? "",
              isMutualFollow: false,
            },
          };
        })
      );
      return posts;
    }
  } catch (error) {
    throw new Error("Failed to fetch first latest posts.");
  }
}

export async function fetchMoreLatestPosts(
  take: number,
  myId: string | null,
  cursorPostId: string
) {
  noStore();
  try {
    const data = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take,
      skip: 1, // Skip the cursor
      cursor: {
        id: cursorPostId,
      },
    });
    if (myId) {
      const posts = await Promise.all(
        data.map(async (post) => {
          const author = await fetchUserById(post.authorId);
          return {
            ...post,
            author: {
              username: author?.username ?? "",
              avatar: author?.image ?? undefined,
              name: author?.name ?? "",
              isMutualFollow: true, // TODO: fix value to be dynamic by func
            },
          };
        })
      );
      return posts;
    } else {
      const posts = await Promise.all(
        data.map(async (post) => {
          const author = await fetchUserById(post.authorId);
          return {
            ...post,
            author: {
              username: author?.username ?? "",
              avatar: author?.image ?? undefined,
              name: author?.name ?? "",
              isMutualFollow: false,
            },
          };
        })
      );
      return posts;
    }
  } catch (error) {
    throw new Error("Failed to fetch more latest posts.");
  }
}

export async function fetchUserPostsById(userId: string, take: number) {
  noStore();
  try {
    const data = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take,
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch first User posts.");
  }
}

export async function fetchMoreUserPostsById(
  userId: string,
  take: number,
  cursorPostId: string
) {
  noStore();
  try {
    const data = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take,
      skip: 1, // Skip the cursor
      cursor: {
        id: cursorPostId,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch more User posts.");
  }
}
