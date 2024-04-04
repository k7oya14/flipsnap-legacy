"use server";

import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "./prismaClient";
import { UserRelationship } from "./definitions";

export async function getUsernameById(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
    },
  });
  return data;
}

export async function fetchUserByUsername(
  username: string,
  myId: string | undefined | null
) {
  noStore();
  try {
    const data = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        _count: {
          select: {
            follows: true,
            followers: true,
            posts: true,
          },
        },
      },
    });
    let relationship: UserRelationship | undefined;
    if (myId) {
      relationship = data
        ? await fetchUserRelationship(myId, data.id)
        : undefined;
    } else {
      relationship = UserRelationship.NoSession;
    }
    const user = {
      ...data,
      relationship,
    };
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user info by username.");
  }
}

export async function fetchFollows(username: string) {
  noStore();
  try {
    const data = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        follows: {
          select: {
            username: true,
            image: true,
            name: true,
          },
        },
      },
    });
    const follows = data?.follows ? data.follows : [];
    return follows;
  } catch (error) {
    throw new Error("Failed to fetch follows.");
  }
}

export async function fetchFollowers(username: string) {
  noStore();
  try {
    const data = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        followers: {
          select: {
            username: true,
            image: true,
            name: true,
          },
        },
      },
    });
    const followers = data?.followers ? data.followers : [];
    return followers;
  } catch (error) {
    throw new Error("Failed to fetch follows.");
  }
}

export async function fetchUserRelationship(myId: string, userId: string) {
  if (myId === userId) {
    return UserRelationship.Me;
  }
  noStore();
  try {
    const existingFollow = await prisma.user.findUnique({
      where: {
        id: myId,
        follows: {
          some: {
            id: userId,
          },
        },
      },
      select: {
        follows: {
          where: {
            id: userId,
          },
        },
      },
    });
    const existingFollower = await prisma.user.findUnique({
      where: {
        id: myId,
        followers: {
          some: {
            id: userId,
          },
        },
      },
      select: {
        followers: {
          where: {
            id: userId,
          },
        },
      },
    });
    if (existingFollow && existingFollower) {
      return UserRelationship.Mutual;
    } else if (existingFollow) {
      return UserRelationship.Following;
    } else if (existingFollower) {
      return UserRelationship.Follower;
    } else {
      return UserRelationship.None;
    }
  } catch (error) {
    throw new Error("Failed to fetch user relationship.");
  }
}

export async function fetchPost(
  postId: string,
  myId: string | undefined | null
) {
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
    let relationship: UserRelationship | undefined;
    if (myId) {
      relationship = data
        ? await fetchUserRelationship(myId, data.authorId)
        : undefined;
    } else {
      relationship = UserRelationship.NoSession;
    }
    const post = {
      ...data,
      author: {
        ...data?.author,
        relationship,
      },
    };
    return post;
  } catch (error) {
    throw new Error("Failed to fetch a post.");
  }
}

// Fetch Posts API Usage at infinite scroll:
//
//const data = await fetchLatestPosts(2, session?.user.id);
// let cursorPostId = useCursorById(data);
// const data2 = await fetchMoreLatestPosts(12, session?.user.id, cursorPostId);
// cursorPostId = useCursorById(data2);
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
          // const relationship = await fetchUserRelationship(myId, post.authorId);
          return {
            ...post,
            author: {
              ...post.author,
              // relationship,
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
              // relationship: UserRelationship.NoSession,
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
          // const relationship = await fetchUserRelationship(myId, post.authorId);
          return {
            ...post,
            author: {
              ...post.author,
              // relationship,
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
              // relationship: UserRelationship.NoSession,
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
