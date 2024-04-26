"use client";

import React from "react";
import { createComment } from "@/lib/actions";
import CommentTextareAndButton from "./CommentTextareaAndButton";
import { Comment, sessionUser } from "@/lib/definitions";
import { fetchComments } from "@/lib/fetch";

type Props = {
  me: sessionUser | undefined;
  postId: string;
  onSubmit: (commentContent: string) => void;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const CommentForm = (props: Props) => {
  const { me, postId, onSubmit, setComments } = props;
  const [commentContent, setCommentContent] = React.useState("");
  return (
    <form
      action={async (formData) => {
        onSubmit(commentContent);
        await createComment(me!.id, postId, formData);
        const newComment = await fetchComments(postId, 1);
        setComments((prev) => [...newComment, ...prev]);
      }}
      className="flex items-center border-t border-t-gray-200 bg-neutral-100"
    >
      <CommentTextareAndButton
        commentContent={commentContent}
        setCommentContent={setCommentContent}
      />
    </form>
  );
};

export default CommentForm;
