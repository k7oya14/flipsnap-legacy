"use server";

import { unstable_noStore as noStore } from "next/cache";
import prisma from "./prismaClient";
import FlipImage from "@/components/FlipImage";
import ImageFront from "@/components/home/ImageFront";
import ImageBack from "@/components/home/ImageBack";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export async function fetchLatestPostsComponent(
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
      return {
        component: posts.map((post, index) => (
          <FlipImage
            key={post.id}
            containerStyle={{
              width: "100%",
              height: "auto",
              marginBottom: "8px",
            }}
            frontComponent={<ImageFront index={index} post={post} />}
            backComponent={
              <Suspense fallback={<Skeleton className="w-full h-40" />}>
                <ImageBack post={post} />
              </Suspense>
            }
          />
        )),
        cursorId: posts[posts.length - 1].id,
      };
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
      return {
        component: posts.map((post, index) => (
          <FlipImage
            key={post.id}
            containerStyle={{
              width: "100%",
              height: "auto",
              marginBottom: "8px",
            }}
            frontComponent={<ImageFront index={index} post={post} />}
            backComponent={
              <Suspense fallback={<Skeleton className="w-full h-40" />}>
                <ImageBack post={post} />
              </Suspense>
            }
          />
        )),
        cursorId: posts[posts.length - 1].id,
      };
    }
  } catch (error) {
    throw new Error("Failed to fetch first latest posts.");
  }
}

export async function fetchMoreLatestPostsComponent(
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
      return {
        component: posts.map((post, index) => (
          <FlipImage
            key={post.id}
            containerStyle={{
              width: "100%",
              height: "auto",
              marginBottom: "8px",
            }}
            frontComponent={<ImageFront index={index} post={post} />}
            backComponent={
              <Suspense fallback={<Skeleton className="w-full h-40" />}>
                <ImageBack post={post} />
              </Suspense>
            }
          />
        )),
        cursorId: posts[posts.length - 1].id,
      };
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
      return {
        component: posts.map((post, index) => (
          <FlipImage
            key={post.id}
            containerStyle={{
              width: "100%",
              height: "auto",
              marginBottom: "8px",
            }}
            frontComponent={<ImageFront index={index} post={post} />}
            backComponent={
              <Suspense fallback={<Skeleton className="w-full h-40" />}>
                <ImageBack post={post} />
              </Suspense>
            }
          />
        )),
        cursorId: posts[posts.length - 1].id,
      };
    }
  } catch (error) {
    throw new Error("Failed to fetch more latest posts.");
  }
}
