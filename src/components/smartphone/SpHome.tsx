import React from "react";
import { SpHomePost } from "./SpHomePost";
import { GalleyPost } from "@/lib/definitions";
import SpHomeLoadMore from "./SpHomeLoadMore";
import { useCursorById } from "@/lib/utils";
import { auth } from "@/lib/auth";

type Props = {
  firstPosts: GalleyPost[];
};

const SpHome = async (props: Props) => {
  const { firstPosts } = props;
  const session = await auth();
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
