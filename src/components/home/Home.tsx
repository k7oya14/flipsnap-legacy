import { fetchLatestPosts } from "@/lib/fetch";
import React from "react";
import SpHome from "../smartphone/SpHome";
import Image from "next/image";
import HomeGallery from "./HomeGallery";

const Home = async () => {
  const firstPosts = await fetchLatestPosts(12, null);

  return (
    <>
      <div className="block sm:hidden">
        <SpHome firstPosts={firstPosts} />
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
        <HomeGallery firstPosts={firstPosts} />
      </div>
    </>
  );
};

export default Home;
