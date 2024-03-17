"use client";

import Image from "next/image";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

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
    roomId: number
  ) => {
    e.preventDefault();
    setIsFlipped((prevFlips) => {
      const updatedFlips = [...prevFlips];
      updatedFlips[roomId - 1] = !updatedFlips[roomId - 1];
      return updatedFlips;
    });
  };

  return (
    <div className="lg:px-40 p-5 grid lg:grid-cols-3 grid-cols-2 gap-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((roomId) => (
        <ReactCardFlip
          key={roomId}
          isFlipped={isFlipped[roomId - 1]}
          flipDirection="horizontal"
          flipSpeedBackToFront={0.5}
          flipSpeedFrontToBack={0.5}
          infinite={true}
          cardZIndex={`${roomId / 3}`}
        >
          <div
            onClick={(e) => handleClick(e, roomId)}
            className="p-0 hover:cursor-pointer rounded-md"
          >
            <Image
              width={300}
              height={400}
              className="rounded-md"
              alt=""
              src={`https://source.unsplash.com/collection/1346951/1200x1600?sig=${roomId}`}
            />
          </div>
          <div
            onClick={(e) => handleClick(e, roomId)}
            className="hover:cursor-pointer rounded-md"
          >
            <Image
              width={300}
              height={400}
              className="rounded-md"
              alt=""
              src={`https://source.unsplash.com/collection/1346951/1200x1600?sig=${
                roomId + 10
              }`}
            />
          </div>
        </ReactCardFlip>
      ))}
    </div>
  );
}
