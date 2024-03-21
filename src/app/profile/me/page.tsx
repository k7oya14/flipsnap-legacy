import { auth } from "@/lib/auth";
import { getUsernameById } from "@/lib/fetch";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const session = await auth();
  if (session) {
    const user = await getUsernameById(session.user.id);
    if (user) {
      redirect(`/profile/${user.username}`);
    }
  }
  redirect("/profile/error");
}

export default Page;
