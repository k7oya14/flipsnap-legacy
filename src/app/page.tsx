import React from "react";

import Image from "next/image";
import { fetchLatestPosts, fetchMoreLatestPosts } from "@/lib/fetch";
import { auth } from "@/lib/auth";
import HomeGallery from "@/components/home/HomeGallery";
import LoginHomeGallery from "@/components/home/LoginHomeGallery";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const flipCard = searchParams["flip"];
  const session = await auth();
  const posts = await fetchLatestPosts(12, session?.user.id);

  return (
    <div className="flex flex-col justify-center">
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
        <HomeGallery flipCard={flipCard!} firstPost={posts} />
      ) : (
        <LoginHomeGallery firstPost={posts} />
      )}
    </div>
  );
}
