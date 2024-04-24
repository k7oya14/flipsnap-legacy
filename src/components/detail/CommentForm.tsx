"use client";

import React, { useRef } from "react";
import { createComment } from "@/lib/actions";
import { useFormState } from "react-dom";
import CommentTextareAndButton from "./CommentTextareaAndButton";

type Props = {
  myId: string | undefined | null;
  postId: string;
};

const CommentForm = (props: Props) => {
  const { myId, postId } = props;
  const initialState = {
    message: "",
    errors: { content: [] },
  };
  const createCommentWithId = createComment.bind(null, myId!, postId);
  const [state, dispatch] = useFormState(createCommentWithId, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={dispatch}
      ref={formRef}
      className="flex items-center border-t border-t-gray-200 bg-neutral-100"
    >
      <CommentTextareAndButton />
    </form>
  );
};

export default CommentForm;
