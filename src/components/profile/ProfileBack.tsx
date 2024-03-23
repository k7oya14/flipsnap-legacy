import Image from "next/image";
import React from "react";
import LockedBack from "../LockedBack";

type Props = {
  src: string;
  handleClick: () => void;
};

const ProfileBack = (props: Props) => {
  const { src, handleClick } = props;
  return (
    <div>
      <div
        onClick={handleClick}
        className="relative hover:cursor-pointer rounded-lg border-[3px] border-gray-200 "
      >
        <Image
          alt="Post image"
          className="w-full rounded blur-lg"
          height="293"
          src={src}
          style={{
            aspectRatio: "293/293",
            objectFit: "cover",
          }}
          width="293"
        />
        <LockedBack />
      </div>
    </div>
  );
};

export default ProfileBack;
