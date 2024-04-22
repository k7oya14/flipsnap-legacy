import { auth } from "@/lib/auth";
import { fetchPost } from "@/lib/fetch";
import React from "react";
import ErrorCard from "../ErrorCard";
import { PostDetail } from "./PostDetail";
import { SpDetailPost } from "../smartphone/SpDetailPost";

type Props = { postId: string };

const DetailPost = async (props: Props) => {
  const { postId } = props;
  const session = await auth();
  const post = await fetchPost(postId);
  if (!post?.id)
    return (
      <ErrorCard
        heading="Post not found"
        message="お探しの投稿が見つかりませんでした"
        button="Go Home"
        link="/"
      />
    );
  return (
    <>
      <div className="hidden sm:block max-w-5xl w-[90%] max-h-[600px] h-[83vh] mx-auto my-2 bg-neutral-100 rounded-lg">
        <PostDetail post={post} myId={session?.user.id} />
      </div>
      <div className="sm:hidden flex flex-col">
        <SpDetailPost post={post} myId={session?.user.id} />
      </div>
    </>
  );
};

export default DetailPost;
