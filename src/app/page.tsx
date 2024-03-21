"use client";

import React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { fetchLatestPosts } from "@/lib/fetch";
import { auth } from "@/lib/auth";
import HomeGallery from "@/components/home/HomeGallery";

export default async function Home() {
  //   const session = await auth();
  const searchParams = useSearchParams();
  const flipCard = Number(searchParams.get("flip"));

  //   const data = await fetchLatestPosts(2, session?.user.id);

  return (
    <div className="flex flex-col justify-center">
      <Image
        width={1200}
        height={628}
        unoptimized
        className="mt-1 max-w-full min-w-[66.67vh] max-h-[66.67vh] object-contain"
        alt=""
        src="/hero.gif"
      />
      <HomeGallery flipCard={flipCard} />
    </div>
  );
}
