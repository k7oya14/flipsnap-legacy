import CreatePostForm from "@/components/CreatePostForm";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/profile/error");
  }
  return (
    <>
      <CreatePostForm userId={session.user.id} />
    </>
  );
};

export default page;
