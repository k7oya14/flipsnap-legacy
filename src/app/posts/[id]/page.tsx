import { PostDetail } from "@/components/detail/PostDetail";
import DetailSkeleton from "@/components/skeleton/DetailSkeleton";
import SpOnePostSkeleton from "@/components/skeleton/SpOnePostSkeleton";
import { SpDetailPost } from "@/components/smartphone/SpDetailPost";
import { fetchComments, fetchMoreComments } from "@/lib/fetch";
import { useCursorById } from "@/lib/utils";
import React, { Suspense } from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const { cursorById } = useCursorById();
  const data = await fetchComments(params.id, 1);
  console.log(data);
  let cursorCommentId = cursorById(data);
  const data2 = await fetchMoreComments(params.id, 2, cursorCommentId);
  console.log(data2);
  return (
    <>
      <div className="hidden sm:block max-w-5xl w-[90%] max-h-[600px] h-[83vh] mx-auto my-2">
        <Suspense fallback={<DetailSkeleton />}>
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
