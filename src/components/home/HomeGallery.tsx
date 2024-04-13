import { fetchLatestPosts } from "@/lib/fetch";
import React from "react";
import NoLoginHomeGallery from "./NoLoginHomeGallery";
import LoginHomeGallery from "./LoginHomeGallery";
import { auth } from "@/lib/auth";

const HomeGallery = async () => {
  const session = await auth();
  const posts = await fetchLatestPosts(12, session?.user.id);

  return session ? (
    <LoginHomeGallery firstPost={posts} />
  ) : (
    <NoLoginHomeGallery firstPost={posts} />
  );
};

export default HomeGallery;
