"use client";

import React from "react";
import { updateUsername } from "@/lib/actions";
import { useFormState } from "react-dom";

function SignupForm({ userId }: { userId: string }) {
  const initialState = { message: "", errors: { username: [] } };
  const updateUsernameWithId = updateUsername.bind(null, userId);
  const [state, dispatch] = useFormState(updateUsernameWithId, initialState);
  return (
    <div className="ml-4">
      <form action={dispatch}>
        <input
          className="border-gray-300 border-2 "
          id="username"
          name="username"
          type="text"
          placeholder="username"
          required
          aria-describedby="username-error"
        />
        <div id="username-error" aria-live="polite" aria-atomic="true">
          {state.errors?.username &&
            state.errors.username.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <button
          className=" border-gray-300 border-2 p-1 mt-2 ml-2 rounded-md hover:bg-gray-200"
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
