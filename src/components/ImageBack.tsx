import Image from "next/image";
import React from "react";
import LockedBack from "./LockedBack";
import { Post } from "@/lib/definitions";

type Props = {
  post: Post;
  handleClick: () => void;
};

const ImageBack = (props: Props) => {
  const { post, handleClick } = props;
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
          className="rounded-md blur-lg py-2"
          alt=""
          src={post.imgBack}
        />
        <LockedBack />
      </div>
    </div>
  );
};

export default ImageBack;
