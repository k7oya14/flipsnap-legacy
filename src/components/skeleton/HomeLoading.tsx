import React from "react";
import SpHomeSkeleton from "./SpHomeSkeleton";
import HomeSkeleton from "./HomeSkeleton";
import Image from "next/image";

const HomeLoading = () => {
  return (
    <>
      <div className="sm:hidden block">
        <SpHomeSkeleton />
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
        <HomeSkeleton />
      </div>
    </>
  );
};

export default HomeLoading;
