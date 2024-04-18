import React from "react";
import SpHome from "../smartphone/SpHome";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { fetchLatestPosts } from "@/lib/fetch";
import { GalleyPost } from "@/lib/definitions";
import HomeGallery from "./HomeGallery";

const Home = async () => {
  const session = await auth();
  const firstPosts = await fetchLatestPosts(12);
  const firstPostThreeArrays: GalleyPost[][] = [[], [], []];
  firstPosts.forEach((post, i) => {
    firstPostThreeArrays[i % 3] = [...firstPostThreeArrays[i % 3], post];
  });
  return (
    <>
      <div className="block sm:hidden">
        <SpHome myId={session?.user.id} firstPosts={firstPosts} />
      </div>
      <div className="hidden sm:flex flex-col justify-center">
        <Image
          width={1200}
          height={628}
          unoptimized
          priority={true}
          className="mt-1 w-full h-[66.67vh] object-contain"
          alt=""
          src="/hero.gif"
        />
        <HomeGallery
          myId={session?.user.id}
          firstPosts={firstPostThreeArrays}
          cursorId={firstPosts[firstPosts.length - 1].id}
        />
      </div>
    </>
  );
};

export default Home;
