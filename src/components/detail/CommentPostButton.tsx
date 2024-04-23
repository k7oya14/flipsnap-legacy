import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

const CommentPostButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="bg-neutral-800" aria-disabled={pending}>
      {pending ? (
        <>
          <LoaderCircle className="w-6 h-6 animate-spin mr-2" />
          {/* <span>...</span> */}
        </>
      ) : (
        "Post"
      )}
    </Button>
  );
};

export default CommentPostButton;
