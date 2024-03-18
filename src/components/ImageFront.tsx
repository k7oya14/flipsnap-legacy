import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  col: number;
  row: number;
  src: string;
  handleClick: (id: number) => void;
};

const ImageFront = (props: Props) => {
  const { col, row, src, handleClick } = props;
  return (
    <div>
      <div
        onClick={(e) => handleClick(col * 4 + row)}
        className="group relative rounded-md my-2 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        <Image
          width={500}
          height={500}
          className="rounded-md"
          alt=""
          src={src}
        />
        <Avatar className="absolute bottom-2 left-2 invisible group-hover:visible">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <ArrowsPointingOutIcon className="absolute bottom-2 right-2 invisible group-hover:visible h-5 w-5 text-slate-200" />
      </div>
    </div>
  );
};

export default ImageFront;
