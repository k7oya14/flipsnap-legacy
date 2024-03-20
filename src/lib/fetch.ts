import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "./prismaClient";

export async function fetchUserById(id: string) {
  noStore();
  try {
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch User info.");
  }
}

// Fetch Post API Usage :
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
            name: author?.name,
            avatar: author?.image,
            isMutualFollow: true, // TODO: fix value to be dynamic by func
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
            name: author?.name,
            avatar: author?.image,
            isMutualFollow: false,
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
            name: author?.name,
            avatar: author?.image,
            isMutualFollow: true, // TODO: fix value to be dynamic by func
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
            name: author?.name,
            avatar: author?.image,
            isMutualFollow: false,
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
    throw new Error("Failed to fetch first User posts.");
  }
}
