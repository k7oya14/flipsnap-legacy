"use client";

import React from "react";
import ReactCardFlip from "react-card-flip";

import ImageFront from "@/components/ImageFront";
import ImageBack from "@/components/ImageBack";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const searchParams = useSearchParams();
  const flipCard = Number(searchParams.get("flip"));
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleFront = (flipId: number) => {
    params.set("flip", flipId.toString());
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleBack = () => {
    params.delete("flip");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col justify-center">
      <Image
        width={1200}
        height={628}
        unoptimized
        className="mt-1 max-w-full min-w-[66.67vh] max-h-[66.67vh] object-contain"
        alt=""
        src="/hero.gif"
      />
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
    </div>
  );
}
