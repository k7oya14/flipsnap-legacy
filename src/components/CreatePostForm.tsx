"use client";

import { createPost } from "@/lib/actions";
import React from "react";
import { useFormState } from "react-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CardContent, CardHeader } from "./ui/card";
import { AutosizeTextarea } from "./ui/autosizeTextarea";
import { Roboto_Slab } from "next/font/google";
import { CameraIcon } from "@heroicons/react/24/outline";

const robotoSlab = Roboto_Slab({ weight: "400", subsets: ["latin"] });

function CreatePostForm({ userId }: { userId: string }) {
  const initialState = {
    message: "",
    errors: { imgFront: [], imgBack: [], caption: [] },
  };
  const createPostWithId = createPost.bind(null, userId);
  const [state, dispatch] = useFormState(createPostWithId, initialState);
  return (
    <div className={robotoSlab.className}>
      <CardHeader className="flex items-center">
        <h1 className="text-xl">Create Post</h1>
        <CameraIcon className="w-8 h-8 text-black" />
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <form action={dispatch} className="w-full">
          <div className="mb-4">
            <Label className="ml-[2px]" htmlFor="imgFront">
              Front Image
            </Label>
            <Input
              type="file"
              accept="image/*"
              name="imgFront"
              id="imgFront"
              required
              aria-describedby="imgFront-error"
              className="border border-slate-400 p-2"
            />
            <div id="imgFront-error" aria-live="polite" aria-atomic="true">
              {state.errors?.imgFront &&
                state.errors.imgFront.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mb-4">
            <Label className="ml-[2px]" htmlFor="imgBack">
              Back Image
            </Label>
            <Input
              type="file"
              accept="image/*"
              name="imgBack"
              id="imgBack"
              required
              aria-describedby="imgBack-error"
              className="border border-slate-400 p-2"
            />
            <div id="imgBack-error" aria-live="polite" aria-atomic="true">
              {state.errors?.imgBack &&
                state.errors.imgBack.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mb-4">
            <Label className="ml-[2px]" htmlFor="caption">
              Caption
            </Label>
            <AutosizeTextarea
              placeholder="Write a caption..."
              maxHeight={300}
              name="caption"
              id="caption"
              className="min-h-[50px] border border-black p-2 focus-visible:ring-transparent focus:border-[1.5px]"
              aria-describedby="caption-error"
            />
            <div id="caption-error" aria-live="polite" aria-atomic="true">
              {state.errors?.caption &&
                state.errors.caption.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full border border-black py-0 my-0 rounded-md hover:bg-gray-800"
          >
            Create Post
          </Button>
        </form>
      </CardContent>
    </div>
  );
}

export default CreatePostForm;
