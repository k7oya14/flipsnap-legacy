import CreatePostForm from "@/components/CreatePostForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/profile/error");
  }
  return (
    <div className="my-4">
      <CreatePostForm userId={session.user.id} />
    </div>
  );
};

export default page;
