"use client";

import React, { useOptimistic, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MessageCircle } from "lucide-react";
import { Comment, sessionUser } from "@/lib/definitions";
import { useCursorById } from "@/lib/utils";
import CommentLoadMore from "../detail/CommentLoadMore";
import OneComment from "../detail/OneComment";
import CommentForm from "../detail/CommentForm";
import { fetchComments } from "@/lib/fetch";

type Props = {
  latestComments?: Comment[] | [];
  postId: string;
  me: sessionUser | undefined;
};

export const SpCommentDrawer = (props: Props) => {
  const { latestComments = [], postId, me } = props;
  const { cursorById } = useCursorById();
  const [optimisticComments, setOptimisticComments] = useOptimistic<Comment[]>(
    []
  );
  const [comments, setComments] = useState<Comment[]>(latestComments);

  const onSubmitComment = (comment: string) => {};

  const fetchMoreCommnent = async () => {
    if (latestComments.length === 0) {
      const comments = await fetchComments(postId, 5);
      setComments([...latestComments, ...comments]);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger onClick={fetchMoreCommnent}>
        <MessageCircle className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="border-b border-gray-200 pb-5">
            Comment
          </DrawerTitle>
        </DrawerHeader>
        <div className="max-h-[60vh] overflow-y-scroll overflow-x-hidden">
          {comments.map((comment) => (
            <OneComment key={comment.id} comment={comment} />
          ))}
          <CommentLoadMore postId={postId} commentId={cursorById(comments)} />
        </div>
        <DrawerFooter className="p-0">
          <CommentForm postId={postId} myId={myId} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
