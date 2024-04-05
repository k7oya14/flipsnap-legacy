import { sessionUser } from "@/lib/definitions";
import { fetchLatestPosts } from "@/lib/fetch";
import React from "react";
import NoLoginHomeGallery from "./NoLoginHomeGallery";
import LoginHomeGallery from "./LoginHomeGallery";

type Props = {
  user: sessionUser | undefined;
};

const HomeGallery = async (props: Props) => {
  const { user } = props;
  const posts = await fetchLatestPosts(12, user!.id);

  return user ? (
    <LoginHomeGallery firstPost={posts} />
  ) : (
    <NoLoginHomeGallery firstPost={posts} />
  );
};

export default HomeGallery;
