"use client";

import React from "react";
import ReactCardFlip from "react-card-flip";
import ImageFront from "../ImageFront";
import ImageBack from "../ImageBack";

type Props = {
  flipCard: number;
  handleFront: (flipId: number) => void;
  handleBack: () => void;
};

const MainPage = (props: Props) => {
  const { flipCard, handleFront, handleBack } = props;
  return (
    <div className="lg:px-40 px-5 flex ">
      {[0, 1, 2].map((col) => (
        <div key={col} className="w-1/3 p-2">
          {[0, 1, 2, 3].map((row) => (
            <ReactCardFlip
              key={row}
              isFlipped={flipCard === col * 4 + row}
              flipDirection="horizontal"
              flipSpeedBackToFront={0.8}
              flipSpeedFrontToBack={0.48}
              infinite={true}
              //   cardZIndex={`${index / 3}`}
            >
              <ImageFront
                col={col}
                row={row}
                handleClick={handleFront}
                src={`https://source.unsplash.com/collection/1346951/${
                  col + (row % 3) + 3
                }00x500?sig=${col * 3 + row}`}
              />
              <ImageBack
                src={`https://source.unsplash.com/collection/1346951/${
                  col + (row % 3) + 3
                }00x500?sig=${row}`}
                handleClick={handleBack}
              />
            </ReactCardFlip>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MainPage;
