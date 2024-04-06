import { PostDetail } from "@/components/detail/PostDetail";
import SpOnePostSkeleton from "@/components/skeleton/SpOnePostSkeleton";
import { SpDetailPost } from "@/components/smartphone/SpDetailPost";
import { Card, CardContent } from "@/components/ui/card";
import React, { Suspense } from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Card className="hidden sm:block max-w-5xl mx-auto my-4">
        <CardContent>
          <div className="hidden sm:block max-w-5xl mx-auto w-[90%] relative">
            <Suspense fallback={<p>loading</p>}>
              <PostDetail postId={params.id} />
            </Suspense>
          </div>
        </CardContent>
      </Card>
      <div className="sm:hidden flex flex-col">
        <Suspense fallback={<SpOnePostSkeleton />}>
          <SpDetailPost postId={params.id} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
