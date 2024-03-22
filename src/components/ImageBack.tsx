import Image from "next/image";
import React from "react";
import LockedBack from "./LockedBack";
import { Post, UserRelationship } from "@/lib/definitions";

type Props = {
  post: Post;
  myId: string | undefined;
  handleClick: () => void;
};

const ImageBack = (props: Props) => {
  const { post, myId, handleClick } = props;
  return (
    <div>
      <div
        onClick={() => handleClick()}
        className="relative hover:cursor-pointer rounded-lg border-[3px] border-gray-200 "
      >
        <Image
          width={500}
          height={500}
          priority={true}
          className={`rounded-md ${
            post.author?.relationship === UserRelationship.Mutual ||
            "filter blur-lg"
          }`}
          alt=""
          src={post.imgBack}
        />
        {post.author?.relationship === UserRelationship.Mutual || (
          <LockedBack
            relationship={post.author?.relationship!}
            myId={myId}
            userId={post.authorId}
          />
        )}
      </div>
    </div>
  );
};

export default ImageBack;
