"use client";

import React, { useRef } from "react";
import { createComment } from "@/lib/actions";
import { useFormState } from "react-dom";
import CommentTextareAndButton from "./CommentTextareaAndButton";
import { sessionUser } from "@/lib/definitions";

type Props = {
  me: sessionUser | undefined;
  postId: string;
  onSubmit: (commentContent: string) => void;
};

const CommentForm = (props: Props) => {
  const { me, postId, onSubmit } = props;
  const initialState = {
    message: "",
    errors: { content: [] },
  };
  const createCommentWithId = createComment.bind(null, me!.id, postId);
  const [state, dispatch] = useFormState(createCommentWithId, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={dispatch}
      ref={formRef}
      className="flex items-center border-t border-t-gray-200 bg-neutral-100"
    >
      <CommentTextareAndButton onSubmit={onSubmit} />
    </form>
  );
};

export default CommentForm;
