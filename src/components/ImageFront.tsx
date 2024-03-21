import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Post } from "@/lib/definitions";

type Props = {
  post: Post;
  handleClick: (id: string) => void;
};

const ImageFront = (props: Props) => {
  const { post, handleClick } = props;

  const handleIconClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };
  return (
    <div>
      <div
        onClick={() => handleClick(post.id)}
        className="group relative rounded-md my-2 overflow-hidden hover:cursor-pointer"
      >
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        <Image
          width={500}
          height={500}
          priority={true}
          className="rounded-md"
          alt=""
          src={post.imgFront}
        />
        <Link
          href={`/profile/${post.author?.username}`}
          onClick={(e) => handleIconClick(e)}
        >
          <Avatar className="absolute bottom-2 left-2 invisible group-hover:visible">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <Link
          onClick={(e) => handleIconClick(e)}
          href={`/posts/${post.id}`}
          scroll={false}
        >
          <ArrowsPointingOutIcon className="absolute bottom-2 right-2 invisible group-hover:visible h-5 w-5 text-slate-200" />
        </Link>
      </div>
    </div>
  );
};

export default ImageFront;
