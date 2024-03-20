import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "./prismaClient";

// export async function fetchLatestPost(take: number) {
//   noStore();
//   try {
//     const data = await prisma.post.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//       take,
//     });
//     return data;
//   } catch (error) {
//     throw new Error("Failed to fetch first latest posts.");
//   }
// }

// export async function fetchMoreLatestPost({
//   take,
//   cursorId,
// }: {
//   take: number;
//   cursorId: string;
// }) {
//   noStore();
//   try {
//     const data = await prisma.post.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//       take,
//       skip: 1, // Skip the cursor
//       cursor: {
//         id: cursorId,
//       },
//     });
//     return data;
//   } catch (error) {
//     throw new Error("Failed to fetch more latest posts.");
//   }
// }

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

export async function fetchLatestPosts({
  take,
  myId,
}: {
  take: number;
  myId: string | null;
}) {
  noStore();
  try {
    const data = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take,
    });
    if (myId) {
      const posts = data.map(async (post) => {
        const author = await fetchUserById(post.authorId);
        return {
          ...post,
          username: author?.username,
          avatar: author?.image,
          isMutualFollow: true,
        };
      });
      return posts;
    } else {
      const posts = data.map(async (post) => {
        const author = await fetchUserById(post.authorId);
        return {
          ...post,
          username: author?.username,
          avatar: author?.image,
          isMutualFollow: false,
        };
      });
    }
  } catch (error) {
    throw new Error("Failed to fetch first latest posts.");
  }
}

export async function fetchMoreLatestPostById() {
  noStore();
  try {
  } catch (error) {
    throw new Error("Failed to fetch.");
  }
}

export async function fetchUserPostWithId() {
  noStore();
  try {
  } catch (error) {
    throw new Error("Failed to fetch.");
  }
}
