import { PostDetail } from "@/components/detail/PostDetail";
import SpOnePostSkeleton from "@/components/skeleton/SpOnePostSkeleton";
import { SpDetailPost } from "@/components/smartphone/SpDetailPost";
import React, { Suspense } from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="hidden sm:block max-w-5xl w-[90%] max-h-[600px] h-[83vh] mx-auto my-2">
        <Suspense fallback={<p>loading</p>}>
          <PostDetail postId={params.id} />
        </Suspense>
      </div>
      <div className="sm:hidden flex flex-col">
        <Suspense fallback={<SpOnePostSkeleton />}>
          <SpDetailPost postId={params.id} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
