"use client";

import React from "react";
import Image from "next/image";

type Props = {
  src: string;
  handleClick: () => void;
};

const DetailImageFront = (props: Props) => {
  const { src, handleClick } = props;

  return (
    <div>
      <div
        onClick={handleClick}
        className="rounded-md my-2 hover:cursor-pointer"
      >
        <Image
          alt=""
          className="h-auto rounded"
          height="758"
          src={src}
          style={{
            aspectRatio: "902/758",
            objectFit: "cover",
          }}
          width="902"
        />
      </div>
    </div>
  );
};

export default DetailImageFront;
