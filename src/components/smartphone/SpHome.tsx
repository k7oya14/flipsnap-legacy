import React from "react";
import SpHomeLoadMore from "./SpHomeLoadMore";
import { GalleyPost } from "@/lib/definitions";
import { useCursorById } from "@/lib/utils";
import { SpHomePost } from "./SpHomePost";

type Props = {
  firstPosts: GalleyPost[];
  myId: string | undefined;
};

const SpHome = async (props: Props) => {
  const { firstPosts, myId } = props;
  const { cursorById } = useCursorById();
  return (
    <div>
      {firstPosts.map((post: GalleyPost) => (
        <SpHomePost key={post.id} post={post} myId={myId} />
      ))}
      <SpHomeLoadMore cursorId={cursorById(firstPosts)} />
    </div>
  );
};

export default SpHome;
