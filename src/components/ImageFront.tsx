import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

type Props = {
  col: number;
  row: number;
  src: string;
  handleClick: (id: number) => void;
};

const ImageFront = (props: Props) => {
  const { col, row, src, handleClick } = props;

  const handleIconClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };
  return (
    <div>
      <div
        onClick={() => handleClick(col * 4 + row)}
        className="group relative rounded-md my-2 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        <Image
          width={500}
          height={500}
          priority={true}
          className="rounded-md"
          alt=""
          src={src}
        />
        <Link
          href={`/profile/${col * 4 + row}`}
          onClick={(e) => handleIconClick(e)}
        >
          <Avatar className="absolute bottom-2 left-2 invisible group-hover:visible">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <Link
          onClick={(e) => handleIconClick(e)}
          href={`/posts/${col * 4 + row}`}
          scroll={false}
        >
          <ArrowsPointingOutIcon className="absolute bottom-2 right-2 invisible group-hover:visible h-5 w-5 text-slate-200" />
        </Link>
      </div>
    </div>
  );
};

export default ImageFront;
