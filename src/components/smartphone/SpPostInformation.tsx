import { formatDistance } from "date-fns";
import { HeartIcon } from "lucide-react";
import React from "react";
import { SpCommentDrawer } from "./SpCommentDrawer";
import { Comment } from "@/lib/definitions";

type Props = {
  home?: boolean;
  latestComments?: Comment[];
  caption: string;
  createdAt: Date;
  postId: string;
  myId: string | undefined | null;
};

const SpPostInformation = (props: Props) => {
  const {
    caption,
    createdAt,
    postId,
    myId,
    home = false,
    latestComments = [],
  } = props;

  return (
    <div className="px-4 gap-2 flex flex-col">
      <div className="flex items-center gap-2">
        <button className="focus:outline-none">
          <HeartIcon className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer" />
        </button>
        <div className="focus:outline-none">
          <SpCommentDrawer
            latestComments={latestComments}
            postId={postId}
            myId={myId}
          />
        </div>
      </div>
      <p
        className={
          home ? "truncate hover:overflow-visible hover:whitespace-normal" : ""
        }
      >
        {caption}
      </p>
      <p className="text-sm text-gray-500">
        Liked by
        <strong className="font-medium text-gray-600">user</strong> and{" "}
        <strong className="font-medium text-gray-600">others</strong>
      </p>
      <div className="flex items-center gap-2">
        <strong className="font-medium text-gray-600">user</strong>
        <p className="text-sm text-gray-500">Great post!</p>
      </div>
      <p className="text-xs text-gray-400">
        {formatDistance(new Date(), Date.parse(String(createdAt)))} ago
      </p>
    </div>
  );
};

export default SpPostInformation;
