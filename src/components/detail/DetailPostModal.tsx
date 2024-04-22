import { auth } from "@/lib/auth";
import { fetchPost } from "@/lib/fetch";
import React from "react";
import ErrorCard from "../ErrorCard";
import { PostDetail } from "./PostDetail";
import { SpDetailPost } from "../smartphone/SpDetailPost";

type Props = { postId: string };

const DetailPostModal = async (props: Props) => {
  const { postId } = props;
  const session = await auth();
  const myId = session?.user.id;
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
      <div className="hidden sm:block relative">
        <PostDetail post={post} myId={session?.user.id} />
      </div>
      <div className="sm:hidden flex flex-col dialog-scroll w-full overflow-y-scroll">
        <SpDetailPost post={post} myId={session?.user.id} />
      </div>
    </>
  );
};

export default DetailPostModal;
