import React, { Suspense } from "react";
import { SpHomePost } from "./SpHomePost";
import { GalleyPost, sessionUser } from "@/lib/definitions";
import SpHomeLoadMore from "./SpHomeLoadMore";
import { useCursorById } from "@/lib/utils";
import { fetchLatestPosts } from "@/lib/fetch";

type Props = {
  //   firstPosts: GalleyPost[];
  user: sessionUser | undefined;
};

const SpHome2 = async (props: Props) => {
  const { user } = props;
  //   const { firstPosts } = props;
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

export default SpHome2;
