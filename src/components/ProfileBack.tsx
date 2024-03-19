import { LockClosedIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

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
        <div className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-b from-transparent to-black rounded-b">
          <div className="absolute  flex flex-col justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <LockClosedIcon className="h-10 w-10 left-1/2 text-white" />
            <p className="text-white">Locked</p>
            {/* <Button className="mt-2 bg-white hover:bg-slate-100 rounded-full text-black font-bold">
              Follow
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBack;
