import React from "react";
import { SpHomePost } from "./SpHomePost";
import { GalleyPost } from "@/lib/definitions";
import SpHomeLoadMore from "./SpHomeLoadMore";
import { useCursorById } from "@/lib/utils";
import { fetchLatestPosts } from "@/lib/fetch";
import { auth } from "@/lib/auth";

const SpHome = async () => {
  const session = await auth();
  const firstPosts = await fetchLatestPosts(12, null);
  const { cursorById } = useCursorById();
  return (
    <div>
      {firstPosts.map((post: GalleyPost) => (
        <SpHomePost key={post.id} post={post} />
      ))}
      <SpHomeLoadMore cursorId={cursorById(firstPosts)} />
    </div>
  );
};

export default SpHome;
