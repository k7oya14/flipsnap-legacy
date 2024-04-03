import React from "react";

import Image from "next/image";
import { fetchLatestPosts } from "@/lib/fetch";
import { auth } from "@/lib/auth";
import HomeGallery from "@/components/home/HomeGallery";
import LoginHomeGallery from "@/components/home/LoginHomeGallery";
// import SpHome from "@/components/smartphone/SpHome";
import SpHome2 from "@/components/smartphone/SpHome2";

export default async function Home() {
  const session = await auth();
  const posts = await fetchLatestPosts(12, session?.user.id);

  return (
    <>
      <div className="block sm:hidden">
        {/* <SpHome firstPosts={posts}/> */}
        <SpHome2 firstPosts={posts} />
      </div>
      <div className="hidden sm:flex flex-col justify-center">
        <Image
          width={1200}
          height={628}
          unoptimized
          priority
          className="mt-1 w-full h-[66.67vh] object-contain"
          alt=""
          src="/hero.gif"
        />
        {!session ? (
          <HomeGallery firstPost={posts} />
        ) : (
          <LoginHomeGallery firstPost={posts} />
        )}
      </div>
    </>
  );
}
