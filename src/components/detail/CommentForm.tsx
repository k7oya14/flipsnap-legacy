"use client";

import React, { useEffect, useRef } from "react";
import { AutosizeTextarea } from "../ui/autosizeTextarea";
import { createComment } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";

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
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (pending || state.message === "Comment created successfully.") {
      formRef.current?.reset();
    }
  }, [pending, state.message]);

  return (
    <form action={dispatch} ref={formRef}>
      <AutosizeTextarea
        name="content"
        id="content"
        aria-describedby="content-error"
        maxHeight={100}
        minHeight={37}
        className="border-t h-10 dialog-scroll border-t-gray-200 bg-neutral-100 resize-none rounded-none rounded-br-lg focus-visible:ring-offset-0 focus-visible:ring-0 w-full"
        placeholder="Add a comment..."
      />
      <Button type="submit">Post</Button>
    </form>
  );
};

export default CommentForm;
