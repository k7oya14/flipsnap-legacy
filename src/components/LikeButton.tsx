"use client";

import { HeartIcon } from "lucide-react";
import React from "react";

type Props = {
  myId: string | undefined | null;
  postId: string;
};

const LikeButton = (props: Props) => {
  const { myId, postId } = props;
  return (
    <HeartIcon className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer" />
  );
};

export default LikeButton;
