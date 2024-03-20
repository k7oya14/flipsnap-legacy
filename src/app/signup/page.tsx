import React from "react";
import { SignupForm } from "@/components/SignupForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const SignUp = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/profile/error");
  }

  return (
    <>
      <SignupForm email={session.user.email} />
    </>
  );
};

export default SignUp;
