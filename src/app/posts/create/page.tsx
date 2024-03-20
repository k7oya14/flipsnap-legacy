import CreatePostForm from "@/components/CreatePostForm";
import { auth } from "@/lib/auth";
import React from "react";

const page = async () => {
  const session = await auth();
  if (!session) {
    return <h1>You need to be logged in to access this page.</h1>;
  }
  return (
    <>
      <CreatePostForm userId={session.user.id} />
    </>
  );
};

export default page;
