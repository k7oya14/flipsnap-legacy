"use client";

import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

import ImageFront from "@/components/ImageFront";
import ImageBack from "@/components/ImageBack";

export default function Home() {
  const [isFlipped, setIsFlipped] = useState<boolean[]>(
    Array.from({ length: 12 }, () => false)
  );

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    col: number,
    row: number
  ) => {
    e.preventDefault();
    setIsFlipped((prevFlips) => {
      const updatedFlips = [...prevFlips];
      //   updatedFlips[col][row] = !updatedFlips[col][row];
      //   updatedFlips[col][row] = !updatedFlips[col][row];
      //   console.log(col, row, updatedFlips[col][row]);
      updatedFlips[col * 4 + row] = !updatedFlips[col * 4 + row];
      console.log(col, row, updatedFlips[col * 4 + row]);
      return updatedFlips;
    });
  };
  console.log(isFlipped[0]);
  return (
    <div className="lg:px-40 p-5 flex ">
      {[0, 1, 2].map((col) => (
        <div key={col} className="w-1/3 p-2">
          {[0, 1, 2, 3].map((row) => (
            <ReactCardFlip
              key={row}
              //   isFlipped={isFlipped[col][row]}
              isFlipped={isFlipped[col * 4 + row]}
              flipDirection="horizontal"
              flipSpeedBackToFront={0.5}
              flipSpeedFrontToBack={0.5}
              infinite={true}
              //   cardZIndex={`${index / 3}`}
            >
              <ImageFront
                col={col}
                row={row}
                handleClick={handleClick}
                src={`https://source.unsplash.com/collection/1346951/${
                  col + (row % 3) + 3
                }00x500?sig=${col * 3 + row}`}
              />
              <ImageBack
                col={col}
                row={row}
                src={`https://source.unsplash.com/collection/1346951/${
                  col + (row % 3) + 3
                }00x500?sig=${row}`}
                handleClick={handleClick}
              />
            </ReactCardFlip>
          ))}
        </div>
      ))}
    </div>
  );
}
