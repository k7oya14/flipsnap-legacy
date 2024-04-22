import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Comment } from "@/lib/definitions";
import { formatDistance } from "date-fns";
import ModalLink from "./ModalLink";

type Props = {
  comment: Comment;
};

const OneComment = (props: Props) => {
  const { comment } = props;
  return (
    <div className="flex items-start space-x-3 p-3">
      <ModalLink
        href={`/profile/${comment.author.username}`}
        className="hover:cursor-pointer"
      >
        <Avatar className="size-8">
          <AvatarImage src={comment.author.image!} />
          <AvatarFallback>{comment.author.username}</AvatarFallback>
        </Avatar>
      </ModalLink>
      <div>
        <div className="font-semibold text-sm">
          <ModalLink
            href={`/profile/${comment.author.username}`}
            className="hover:cursor-pointer"
          >
            {comment.author.name}
          </ModalLink>
          <span className="font-normal">{comment.content}</span>
        </div>
        <p className="text-xs text-gray-500">
          {formatDistance(new Date(), Date.parse(String(comment.createdAt)))}{" "}
          ago
        </p>
      </div>
    </div>
  );
};

export default OneComment;
