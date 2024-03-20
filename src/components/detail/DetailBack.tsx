"use client";

import React from "react";
import Image from "next/image";
import LockedBack from "../LockedBack";

type Props = {
  src: string;
  handleClick: () => void;
};

const DetailBack = (props: Props) => {
  const { src, handleClick } = props;

  return (
    <div>
      <div
        onClick={handleClick}
        className="relative border-2 border-slate-200 rounded-md my-2 hover:cursor-pointer"
      >
        <Image
          alt=""
          className="h-auto rounded blur-lg"
          height="758"
          src={src}
          style={{
            aspectRatio: "902/758",
            objectFit: "cover",
          }}
          width="902"
        />
        <LockedBack />
      </div>
    </div>
  );
};

export default DetailBack;
