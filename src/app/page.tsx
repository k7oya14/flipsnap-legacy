// import React from "react";

// import Image from "next/image";
// import { fetchLatestPosts } from "@/lib/fetch";
// import { auth } from "@/lib/auth";
// import HomeGallery from "@/components/home/HomeGallery";

// export default async function Home({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | undefined };
// }) {
//   //   const flipCard = searchParams["flip"];
//   //   const session = await auth();
//   //   const post = await fetchLatestPosts(6, session?.user.id);

//   return (
//     <div className="flex flex-col justify-center">
//       {/* <Image
//         width={1200}
//         height={628}
//         unoptimized
//         priority
//         className="mt-1 max-w-full min-w-[66.67vh] max-h-[66.67vh] object-contain"
//         alt=""
//         src="/hero.gif"
//       />
//       <HomeGallery flipCard={flipCard!} user={session?.user} firstPost={post} /> */}
//     </div>
//   );
// }

import { auth } from "@/lib/auth";
import React from "react";

const page = async () => {
  const session = await auth();
  console.log(session);
  return <div>page</div>;
};

export default page;
