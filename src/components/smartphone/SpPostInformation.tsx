import { formatDistance } from "date-fns";
import React from "react";
import { SpCommentDrawer } from "./SpCommentDrawer";
import { Comment, sessionUser } from "@/lib/definitions";
import LikeButton from "../LikeButton";
import ModalLink from "../detail/ModalLink";
import { Heart } from "lucide-react";

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
    <div className="px-4 flex flex-col">
      <div className="flex items-center mt-[2px]">
        <div className="focus:outline-none">
          {me ? (
            <div className="relative -left-2">
              <LikeButton myId={me?.id} postId={postId} />
            </div>
          ) : (
            <ModalLink href="/profile/error" className="hover:cursor-pointer">
              <Heart className="size-[28px] fill-transparent text-gray-500 hover:text-gray-600" />
            </ModalLink>
          )}
        </div>
        <div
          className={`${
            me ? "relative -left-2" : "ml-1"
          } focus:outline-none focus:ring-0`}
        >
          <SpCommentDrawer
            latestComments={latestComments}
            postId={postId}
            me={me}
          />
        </div>
      </div>
      <p
        className={`relative -top-[6px]
          ${
            home
              ? "truncate hover:overflow-visible hover:whitespace-normal"
              : ""
          }
        `}
      >
        {caption}
      </p>
      <p className={`relative -top-1 text-xs text-gray-400 mb-1`}>
        {formatDistance(new Date(), Date.parse(String(createdAt)))} ago
      </p>
    </div>
  );
};

export default SpPostInformation;
