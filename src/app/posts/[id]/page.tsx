import ErrorCard from "@/components/ErrorCard";
import { PostDetail } from "@/components/detail/PostDetail";
import { SpDetailPost } from "@/components/smartphone/SpDetailPost";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { fetchPost } from "@/lib/fetch";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const postId = params.id;
  const postData = await fetchPost(postId, session?.user.id);
  if (!postData.authorId)
    return (
      <ErrorCard
        heading="Post not found"
        message="投稿が見つかりません"
        button="go back"
        link="/"
      />
    );
  return (
    <>
      <Card className="hidden sm:block max-w-5xl mx-auto my-4">
        <CardContent>
          <div className="hidden sm:block max-w-5xl mx-auto w-[90%] relative">
            <PostDetail post={postData} myId={session?.user.id} />
          </div>
        </CardContent>
      </Card>
      <div className="sm:hidden flex flex-col">
        <SpDetailPost post={postData} />
      </div>
    </>
  );
};

export default Page;
