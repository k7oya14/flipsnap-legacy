import Image from "next/image";
import React from "react";
import LockedBack from "../LockedBack";
import { Post, UserRelationship } from "@/lib/definitions";

type Props = {
  post: Post;
  handleClick: () => void;
};

const ImageBack = (props: Props) => {
  const { post, handleClick } = props;
  const hidden =
    post.author?.relationship === UserRelationship.Mutual ||
    post.author?.relationship === UserRelationship.Me;
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
          className={`rounded-md ${hidden || "filter blur-lg"}`}
          alt=""
          src={post.imgBack}
        />
        {hidden || (
          <LockedBack
            relationship={UserRelationship.NoSession}
          />
        )}
      </div>
    </div>
  );
};

export default ImageBack;
