"use client";

import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

function PostButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full border border-black py-0 my-0 rounded-md hover:bg-gray-800"
      aria-disabled={pending}
    >
      {pending ? (
        <>
          <LoaderCircle className="w-6 h-6 animate-spin mr-2" />
          <span>Processing...</span>
        </>
      ) : (
        "Post"
      )}
    </Button>
  );
}

export default PostButton;
