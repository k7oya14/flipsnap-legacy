"use server";

import { unstable_noStore as noStore } from "next/cache";
import prisma from "./prismaClient";
import { SpHomePost } from "@/components/smartphone/SpHomePost";
// import HomePost from "@/components/home/HomePost";

// export async function fetchLatestPostsComponent(
//   take: number,
//   myId: string | undefined | null
// ) {
//   noStore();
//   try {
//     const data = await prisma.post.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//       include: {
//         author: {
//           select: {
//             username: true,
//             image: true,
//             name: true,
//           },
//         },
//       },
//       take,
//     });
//     if (myId) {
//       const posts = await Promise.all(
//         data.map(async (post) => {
//           // const relationship = await fetchUserRelationship(myId, post.authorId);
//           return {
//             ...post,
//             author: {
//               ...post.author,
//               // relationship,
//             },
//           };
//         })
//       );
//       return {
//         component: posts.map((post, index) => (
//           <HomePost key={post.id} post={post} index={index} myId={myId} />
//         )),
//         cursorId: posts[posts.length - 1].id,
//       };
//     } else {
//       const posts = await Promise.all(
//         data.map(async (post) => {
//           return {
//             ...post,
//             author: {
//               ...post.author,
//               // relationship: UserRelationship.NoSession,
//             },
//           };
//         })
//       );
//       return {
//         component: posts.map((post, index) => (
//   <HomePost key={post.id} post={post} index={index} myId={myId} />
//         )),
//         cursorId: posts[posts.length - 1].id,
//       };
//     }
//   } catch (error) {
//     throw new Error("Failed to fetch first latest posts.");
//   }
// }

// export async function fetchMoreLatestPostsComponent(
//   take: number,
//   myId: string | undefined | null,
//   cursorPostId: string
// ) {
//   noStore();
//   try {
//     const data = await prisma.post.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//       include: {
//         author: {
//           select: {
//             username: true,
//             image: true,
//             name: true,
//           },
//         },
//       },
//       take,
//       skip: 1, // Skip the cursor
//       cursor: {
//         id: cursorPostId,
//       },
//     });
//     if (myId) {
//       const posts = await Promise.all(
//         data.map(async (post) => {
//           // const relationship = await fetchUserRelationship(myId, post.authorId);
//           return {
//             ...post,
//             author: {
//               ...post.author,
//               // relationship,
//             },
//           };
//         })
//       );
//       return {
//         component: posts.map((post, index) => (
//           <HomePost key={post.id} post={post} index={index} myId={myId} />
//         )),
//         cursorId: posts[posts.length - 1].id,
//       };
//     } else {
//       const posts = await Promise.all(
//         data.map(async (post) => {
//           return {
//             ...post,
//             author: {
//               ...post.author,
//               // relationship: UserRelationship.NoSession,
//             },
//           };
//         })
//       );
//       return {
//         component: posts.map((post, index) => (
//           <HomePost key={post.id} post={post} index={index} myId={myId} />
//         )),
//         cursorId: posts[posts.length - 1].id,
//       };
//     }
//   } catch (error) {
//     throw new Error("Failed to fetch more latest posts.");
//   }
// }

// export async function fetchLatestPostsSpComponent(
//   take: number,
//   myId: string | undefined | null
// ) {
//   noStore();
//   try {
//     const data = await prisma.post.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//       include: {
//         author: {
//           select: {
//             username: true,
//             image: true,
//             name: true,
//           },
//         },
//       },
//       take,
//     });
//     if (myId) {
//       const posts = await Promise.all(
//         data.map(async (post) => {
//           // const relationship = await fetchUserRelationship(myId, post.authorId);
//           return {
//             ...post,
//             author: {
//               ...post.author,
//               // relationship,
//             },
//           };
//         })
//       );
//       return {
//         component: posts.map((post) => (
//           <SpHomePost key={post.id} post={post} myId={myId} />
//         )),
//         cursorId: posts[posts.length - 1].id,
//       };
//     } else {
//       const posts = await Promise.all(
//         data.map(async (post) => {
//           return {
//             ...post,
//             author: {
//               ...post.author,
//               // relationship: UserRelationship.NoSession,
//             },
//           };
//         })
//       );
//       return {
//         component: posts.map((post) => (
//           <SpHomePost key={post.id} post={post} myId={myId} />
//         )),
//         cursorId: posts[posts.length - 1].id,
//       };
//     }
//   } catch (error) {
//     throw new Error("Failed to fetch first latest posts.");
//   }
// }

export async function fetchMoreLatestPostsSpComponent(
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
        component: posts.map((post) => (
          <SpHomePost key={post.id} post={post} myId={myId} />
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
        component: posts.map((post) => (
          <SpHomePost key={post.id} post={post} myId={myId} />
        )),
        cursorId: posts[posts.length - 1].id,
      };
    }
  } catch (error) {
    throw new Error("Failed to fetch more latest posts.");
  }
}
