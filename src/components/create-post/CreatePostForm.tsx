"use client";

import { createPost } from "@/lib/actions";
import React from "react";
import { useFormState } from "react-dom";
import { Label } from "../ui/label";
import { CardContent, CardHeader } from "../ui/card";
import { AutosizeTextarea } from "../ui/autosizeTextarea";
import { Roboto_Slab } from "next/font/google";
import {
  Camera,
  RectangleHorizontal,
  RectangleVertical,
  Square,
} from "lucide-react";
import PostButton from "./PostButton";
import CropImage from "./CropImage";

const robotoSlab = Roboto_Slab({ weight: "400", subsets: ["latin"] });

function CreatePostForm({ userId }: { userId: string }) {
  const initialState = {
    message: "",
    errors: { imgFront: [], imgBack: [], caption: [] },
  };
  const createPostWithId = createPost.bind(null, userId);
  const [state, dispatch] = useFormState(createPostWithId, initialState);

  const [imgFront, setImgFront] = React.useState<Blob | undefined>();
  const [imgBack, setImgBack] = React.useState<Blob | undefined>();
  const [aspectRatio, setAspectRatio] = React.useState(0);

  const handleAspectChange = React.useCallback((newAspectRatio: number) => {
    setAspectRatio(newAspectRatio);
  }, []);
  return (
    <div className={robotoSlab.className}>
      <CardHeader className="flex items-center">
        <h1 className="text-xl">Create Post</h1>
        <Camera className="w-8 h-8 text-black" />
      </CardHeader>
      <CardContent className="p-0 h-[310px] w-full px-4">
        <form
          action={(formData) => {
            if (!imgFront || !imgBack) return;
            formData.set("imgFront", imgFront);
            formData.set("imgBack", imgBack);
            dispatch(formData);
          }}
          className="w-full relative h-full"
        >
          {aspectRatio === 0 ? (
            <div className="w-full">
              <h1 className="mb-2">Image Size</h1>
              <div className="flex items-center justify-center space-x-5">
                <button
                  onClick={() => handleAspectChange(3 / 4)}
                  className="border shadow-md flex flex-col items-center p-1 size-16 transition duration-100 transform hover:shadow hover:translate-y-[0.5px]"
                >
                  <RectangleVertical className="size-10 text-black" />
                  <p className="text-sm">3:4</p>
                </button>
                <button
                  onClick={() => handleAspectChange(1)}
                  className="border shadow-md flex flex-col items-center p-1 size-16 transition duration-100 transform hover:shadow hover:translate-y-[0.5px]"
                >
                  <Square className="size-10 text-black" />
                  <p className="text-sm">1:1</p>
                </button>
                <button
                  onClick={() => handleAspectChange(4 / 3)}
                  className="border shadow-md flex flex-col items-center p-1 size-16 transition duration-100 transform hover:shadow hover:translate-y-[0.5px]"
                >
                  <RectangleHorizontal className="size-10 text-black" />
                  <p className="text-sm">4:3</p>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <Label className="ml-[2px]" htmlFor="imgFront">
                  Front Image
                </Label>
                <CropImage
                  setCroppedImage={setImgFront}
                  front={true}
                  aspectRatio={aspectRatio}
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
                <CropImage
                  setCroppedImage={setImgBack}
                  front={false}
                  aspectRatio={aspectRatio}
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
                  className="min-h-[50px] border border-slate-400 p-2 focus-visible:ring-transparent focus:border-[1.3px]"
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
            </>
          )}
          <div className="absolute bottom-3 w-full">
            <PostButton imgFront={imgFront} imgBack={imgBack} />
          </div>
        </form>
      </CardContent>
    </div>
  );
}

export default CreatePostForm;
