import { auth } from "@/lib/auth";
import { fetchComments, fetchPost } from "@/lib/fetch";
import React from "react";
import ErrorCard from "../ErrorCard";
import { PostDetail } from "./PostDetail";
import { SpDetailPost } from "../smartphone/SpDetailPost";

type Props = { postId: string };

const DetailPostModal = async (props: Props) => {
  const { postId } = props;
  const session = await auth();
  const comments = await fetchComments(postId, 3);
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
        <PostDetail
          post={post}
          myId={session?.user.id}
          latestComments={comments}
        />
      </div>
      <div className="sm:hidden flex flex-col dialog-scroll overflow-y-scroll">
        <SpDetailPost
          post={post}
          myId={session?.user.id}
          latestComments={comments}
        />
      </div>
    </>
  );
};

export default DetailPostModal;
