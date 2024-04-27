"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { clsx } from "clsx";

type Props = {
  myId: string | undefined | null;
  postId: string;
  size?: number;
  text?: string;
  onClick?: (arg0: boolean) => void;
  defaultLiked?: boolean;
};

export const LikeButton = (props: Props) => {
  const {
    myId,
    postId,
    size = 42,
    defaultLiked = false,
    text,
    onClick,
  } = props;

  const width = Math.floor(size * 25);
  const [isLiked, setIsLiked] = useState(defaultLiked);
  const [clicked, setClicked] = useState(false);

  const handleOnClick = () => {
    if (onClick) onClick(!isLiked);
    setIsLiked(!isLiked);
    if (!clicked) setClicked(true);
  };

  return (
    <button
      className="relative flex items-center justify-center"
      style={{
        width: text ? "auto" : `${size}px`,
        height: `${size}px`,
        paddingLeft: text ? `${size}px` : "0",
      }}
      onClick={handleOnClick}
    >
      <div
        className={clsx(
          `like-base-64 absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-full`
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundSize: `auto ${size}px`,
          transition: `background-position steps(25)`,
          transitionDuration: isLiked ? "1s" : "0s",
          backgroundPosition: isLiked ? `-${width}px 0` : `0 0`,
        }}
      >
        <Heart
          className={clsx(
            "size-6",
            isLiked
              ? "fill-pink-400 text-pink-400"
              : "fill-transparent text-gray-500 hover:text-gray-600",
            clicked ? (isLiked ? "like-animation" : "like-animation-end") : ""
          )}
        />
      </div>
      {text && (
        <span className={clsx(isLiked ? "text-pink-400" : "text-gray-400")}>
          {text}
        </span>
      )}
    </button>
  );
};

export default LikeButton;
