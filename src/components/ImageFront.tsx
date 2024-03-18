import Image from "next/image";
import React from "react";

type Props = {
  index: number;
  src: string;
  handleClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => void;
};

const ImageFront = (props: Props) => {
  const { index, src, handleClick } = props;
  return (
    <div>
      <div
        onClick={(e) => handleClick(e, index)}
        className="hover:cursor-pointer rounded-md"
      >
        <Image
          width={300}
          height={400}
          className="rounded-md"
          alt=""
          src={src}
        />
      </div>
    </div>
  );
};

export default ImageFront;
