import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

type Props = {
  id: number;
  src: string;
  handleClick: (id: number) => void;
};

const ProfileFront = (props: Props) => {
  const { id, src, handleClick } = props;

  const handleIconClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };
  return (
    <div>
      <div
        onClick={() => handleClick(id)}
        className="group relative rounded-md my-2 overflow-hidden hover:cursor-pointer"
      >
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        <Image
          alt="Post image"
          className="w-full rounded"
          height="293"
          src={src}
          style={{
            aspectRatio: "293/293",
            objectFit: "cover",
          }}
          width="293"
        />
        <Link
          onClick={(e) => handleIconClick(e)}
          href={`/posts/${id}`}
          scroll={false}
        >
          <ArrowsPointingOutIcon className="absolute bottom-2 right-2 invisible group-hover:visible h-5 w-5 text-slate-200" />
        </Link>
      </div>
    </div>
  );
};

export default ProfileFront;
