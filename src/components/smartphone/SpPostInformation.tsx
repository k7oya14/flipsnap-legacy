import { formatDistance } from "date-fns";
import { HeartIcon } from "lucide-react";
import React from "react";
import { SpCommentDrawer } from "./SpCommentDrawer";
import { Comment, sessionUser } from "@/lib/definitions";
import LikeButton from "../LikeButton";

type Props = {
  home?: boolean;
  latestComments?: Comment[];
  caption: string;
  createdAt: Date;
  postId: string;
  me: sessionUser | undefined;
};

const SpPostInformation = (props: Props) => {
  const {
    caption,
    createdAt,
    postId,
    me,
    home = false,
    latestComments = [],
  } = props;

  return (
    <div className="relative -top-2 px-4 flex flex-col">
      <div className="relative -left-[6px] flex items-center">
        <div className="focus:outline-none">
          <div className="p-[6px]">
            <HeartIcon className="size-6 text-gray-500 hover:text-gray-600 cursor-pointer" />
          </div>
        </div>
        <div className="focus:outline-none focus:ring-0 mx-[2px]">
          <SpCommentDrawer
            latestComments={latestComments}
            postId={postId}
            me={me}
          />
        </div>
      </div>
      <p
        className={`relative -top-1
          ${
            home
              ? "truncate hover:overflow-visible hover:whitespace-normal"
              : ""
          }
        `}
      >
        {caption}
      </p>

      <p className="relative -top-1 text-xs text-gray-400 mt-1">
        {formatDistance(new Date(), Date.parse(String(createdAt)))} ago
      </p>
    </div>
  );
};

export default SpPostInformation;
