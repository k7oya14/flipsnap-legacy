"use client";

import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

import ImageFront from "@/components/ImageFront";
import ImageBack from "@/components/ImageBack";

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
          //   cardZIndex={`${index / 3}`}
        >
          <ImageFront
            index={index}
            handleClick={handleClick}
            src={`https://source.unsplash.com/collection/1346951/1200x1600?sig=${index}`}
          />
          <ImageBack
            index={index}
            src={`https://source.unsplash.com/collection/1346951/1200x1600?sig=${
              index + 10
            }`}
            handleClick={handleClick}
          />
        </ReactCardFlip>
      ))}
    </div>
  );
}
