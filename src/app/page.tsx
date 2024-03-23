import React from "react";

import Image from "next/image";
import { fetchLatestPosts, fetchMoreLatestPosts } from "@/lib/fetch";
import { auth } from "@/lib/auth";
import HomeGallery from "@/components/home/HomeGallery";
import { useCursorById } from "@/lib/utils";
import { Post } from "@/lib/definitions";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const flipCard = searchParams["flip"];
  const session = await auth();
  const posts = await fetchLatestPosts(1, session?.user.id);

  return (
    <div className="flex flex-col justify-center">
      <Image
        width={1200}
        height={628}
        unoptimized
        priority
        className="mt-1 max-w-full min-w-[66.67vh] max-h-[66.67vh] object-contain"
        alt=""
        src="/hero.gif"
      />
      <HomeGallery
        flipCard={flipCard!}
        user={session?.user}
        firstPost={posts}
      />
    </div>
  );
}

// // import { auth } from "@/lib/auth";
// import { fetchLatestPosts } from "@/lib/fetch";
// import Image from "next/image";
// import React from "react";
// import { Post } from "@/lib/definitions";

// const page = async () => {
//   const session = await auth();
//   //   const posts = await fetchLatestPosts(1, session?.user.id);
//   //   console.log(session);
//   //   console.log(posts);
//   return (
//     <div>
//       <p>Page</p>
//       {[
//         0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//         1, 1,
//       ].map((_, index) => (
//         <Image
//           width={500}
//           height={500}
//           key={index}
//           src={`https://source.unsplash.com/random/500x500?sig=${index}`}
//           alt=""
//         />
//       ))}
//     </div>
//   );
// };

// export default page;
