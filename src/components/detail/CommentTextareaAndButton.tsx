import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { AutosizeTextarea } from "../ui/autosizeTextarea";
import Head from "next/head";

type Props = {
  commentContent: string;
  setCommentContent: (commentContent: string) => void;
};

const CommentTextareaAndButton = (props: Props) => {
  const { commentContent, setCommentContent } = props;
  const { pending } = useFormStatus();

  useEffect(() => {
    if (pending) {
      setCommentContent("");
    }
  }, [pending]);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0"
        />
      </Head>
      <AutosizeTextarea
        commentContent={commentContent}
        name="content"
        id="content"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        aria-describedby="content-error"
        maxHeight={100}
        minHeight={37}
        className={`h-10 dialog-scroll border-0 bg-neutral-100 resize-none rounded-none focus-visible:ring-offset-0 focus-visible:ring-0 w-full`}
        placeholder={pending ? "Processing..." : "Add a comment..."}
      />
      <Button
        type="submit"
        className={`rounded-none sm:rounded-br-lg bg-neutral-100 hover:bg-neutral-100 ${
          commentContent
            ? "text-neutral-600 hover:text-neutral-900"
            : "text-neutral-300"
        }`}
        disabled={pending || !commentContent}
      >
        {pending ? <LoaderCircle className="size-6 animate-spin" /> : "Post"}
      </Button>
    </>
  );
};

export default CommentTextareaAndButton;
