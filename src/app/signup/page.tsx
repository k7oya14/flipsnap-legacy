import React from "react";
import SignupForm from "@/components/SignupForm";
import { auth } from "@/lib/auth";
import Link from "next/link";

const SignUp = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    return (
      <div>
        <h1>You need to be logged in to access this page</h1>

        <Link href="/api/auth/signin">
          <button className="border-2 border-black p-1 rounded-md hover:bg-gray-300">
            Sign in
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <SignupForm userId={session.user.id} />
    </>
  );
};

export default SignUp;
