import React from "react";
import { SpHomePost } from "./SpHomePost";
import { GalleyPost } from "@/lib/definitions";
import { Card } from "../ui/card";

type Props = {
  firstPosts: GalleyPost[];
};

const SpHome2 = (props: Props) => {
  const { firstPosts } = props;
  return (
    <div>
      {firstPosts.map((post: GalleyPost) => (
        // <Card key={post.id} className="m-2">
        <SpHomePost key={post.id} post={post} />
        // {/* </Card> */}
      ))}
    </div>
  );
};

export default SpHome2;
