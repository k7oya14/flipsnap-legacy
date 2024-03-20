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

export async function fetchPost(postId: string) {
  noStore();
  try {
    const data = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: {
          select: {
            username: true,
            image: true,
            name: true,
          },
        },
      },
    });
    // TODO: const author = data ? await isMutualFollow(data?.authorId) : null;
    const post = data
      ? {
          ...data,
          author: {
            ...data.author,
            isMutualFollow: false, // TODO: fix value to be dynamic by func
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
// const data = await fetchLatestPosts(12, session?.user.id);
// const cursorPostId = useCursor(data);
// const data2 = await fetchMoreLatestPosts(12, session?.user.id, cursorPostId);
// const cursorPostId = useCursor(data);
// const data3 = await fetchMoreLatestPosts(12, session?.user.id, cursorPostId);
// ...

export async function fetchLatestPosts(
  take: number,
  myId: string | undefined | null
) {
  noStore();
  try {
    const data = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            username: true,
            image: true,
            name: true,
          },
        },
      },
      take,
    });
    if (myId) {
      const posts = await Promise.all(
        data.map(async (post) => {
          // TODO: const author = await isMutualFollow(post.authorId);
          return {
            ...post,
            author: {
              ...post.author,
              isMutualFollow: true, // TODO: fix value to be dynamic by func
            },
          };
        })
      );
      return posts;
    } else {
      const posts = await Promise.all(
        data.map(async (post) => {
          return {
            ...post,
            author: {
              ...post.author,
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
  myId: string | undefined | null,
  cursorPostId: string
) {
  noStore();
  try {
    const data = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            username: true,
            image: true,
            name: true,
          },
        },
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
          // TODO: const author = await isMutualFollow(post.authorId);
          return {
            ...post,
            author: {
              ...post.author,
              isMutualFollow: true, // TODO: fix value to be dynamic by func
            },
          };
        })
      );
      return posts;
    } else {
      const posts = await Promise.all(
        data.map(async (post) => {
          return {
            ...post,
            author: {
              ...post.author,
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

export async function fetchUserPosts(userId: string, take: number) {
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

export async function fetchMoreUserPosts(
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
