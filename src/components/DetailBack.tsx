"use client";

import React from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Button } from "./ui/button";
import Image from "next/image";

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
        <div className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-b from-transparent to-black rounded-b">
          <div className="absolute flex flex-col justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <LockClosedIcon className="h-10 w-10 left-1/2 text-white" />
            <p className="text-white">Locked</p>
            <Button className="mt-2 bg-white hover:bg-slate-100 rounded-full text-black font-bold">
              Follow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBack;
