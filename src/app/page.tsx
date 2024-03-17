"use client";

import Image from "next/image";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isFlipped, setIsFlipped] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    setIsFlipped((prevFlips) => {
      const updatedFlips = [...prevFlips];
      updatedFlips[index - 1] = !updatedFlips[index - 1];
      return updatedFlips;
    });
  };

  return (
    <div className="lg:px-40 p-5 grid lg:grid-cols-3 grid-cols-2 gap-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
        <ReactCardFlip
          key={index}
          isFlipped={isFlipped[index - 1]}
          flipDirection="horizontal"
          flipSpeedBackToFront={0.5}
          flipSpeedFrontToBack={0.5}
          infinite={true}
          cardZIndex={`${index / 3}`}
        >
          <div
            onClick={(e) => handleClick(e, index)}
            className="p-0 hover:cursor-pointer rounded-md"
          >
            <Image
              width={300}
              height={400}
              className="rounded-md"
              alt=""
              src={`https://source.unsplash.com/collection/1346951/1200x1600?sig=${index}`}
            />
          </div>
          <div
            onClick={(e) => handleClick(e, index)}
            className="relative hover:cursor-pointer rounded-lg border-[3px] border-gray-200 "
          >
            <Image
              width={300}
              height={400}
              className="rounded-md blur-lg "
              alt=""
              src={`https://source.unsplash.com/collection/1346951/1200x1600?sig=${
                index + 10
              }`}
            />
            <div className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-b from-transparent to-black rounded-b">
              <div className="absolute  flex flex-col justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <LockClosedIcon className="h-10 w-10 left-1/2 text-white" />
                <p className="text-white">Locked</p>
                <Button className="mt-2 bg-white hover:bg-slate-100 rounded-full text-black font-bold">
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </ReactCardFlip>
      ))}
    </div>
  );
}
