import Image from "next/image";
import React from "react";

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
        className="hover:cursor-pointer rounded-md"
      >
        <Image
          width={500}
          height={500}
          className="rounded-md py-2"
          alt=""
          src={src}
        />
      </div>
    </div>
  );
};

export default ImageFront;
