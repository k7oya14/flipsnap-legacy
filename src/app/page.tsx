import React, { Suspense } from "react";

import Image from "next/image";
// import SpHome from "@/components/smartphone/SpHome";
import SpHome2 from "@/components/smartphone/SpHome2";
import SpHomeSkeleton from "@/components/skeleton/SpHomeSkeleton";
import HomeSkeleton from "@/components/skeleton/HomeSkeleton";
import HomeGallery from "@/components/home/HomeGallery";

export default async function Home() {
  return (
    <>
      <div className="block sm:hidden">
        <Suspense fallback={<SpHomeSkeleton />}>
          {/* <SpHome firstPosts={posts}/> */}
          <SpHome2 />
        </Suspense>
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
        <Suspense fallback={<HomeSkeleton />}>
          <HomeGallery />
        </Suspense>
      </div>
    </>
  );
}
