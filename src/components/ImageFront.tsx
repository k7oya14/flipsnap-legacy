import Image from "next/image";
import React from "react";

type Props = {
  col: number;
  row: number;
  src: string;
  handleClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    col: number,
    row: number
  ) => void;
};

const ImageFront = (props: Props) => {
  const { col, row, src, handleClick } = props;
  return (
    <div>
      <div
        onClick={(e) => handleClick(e, col, row)}
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
