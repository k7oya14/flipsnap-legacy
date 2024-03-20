"use client";

import { createPost } from "@/lib/actions";
import React from "react";
import { useFormState } from "react-dom";

function CreatePostForm({ userId }: { userId: string }) {
  const initialState = {
    message: "",
    errors: { imgFront: [], imgBack: [], caption: [] },
  };
  const createPostWithId = createPost.bind(null, userId);
  const [state, dispatch] = useFormState(createPostWithId, initialState);
  return (
    <form action={dispatch} className="ml-2">
      <div>
        <label htmlFor="imgFront">Front Image</label>
        <input
          type="file"
          accept="image/*"
          name="imgFront"
          id="imgFront"
          required
          aria-describedby="imgFront-error"
        />
        <div id="username-error" aria-live="polite" aria-atomic="true">
          {state.errors?.imgFront &&
            state.errors.imgFront.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mt-2">
        <label htmlFor="imgBack">Back Image</label>
        <input
          type="file"
          accept="image/*"
          name="imgBack"
          id="imgBack"
          required
          aria-describedby="imgBack-error"
        />
        <div id="username-error" aria-live="polite" aria-atomic="true">
          {state.errors?.imgBack &&
            state.errors.imgBack.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mt-2 flex align-center">
        <label htmlFor="caption">Caption</label>
        <textarea
          name="caption"
          id="caption"
          className="border-1 border border-black"
          aria-describedby="caption-error"
        />
        <div id="username-error" aria-live="polite" aria-atomic="true">
          {state.errors?.caption &&
            state.errors.caption.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <button
        type="submit"
        className="mt-2 border-2 border-black p-1 rounded-md hover:bg-gray-400"
      >
        Create Post
      </button>
    </form>
  );
}

export default CreatePostForm;
