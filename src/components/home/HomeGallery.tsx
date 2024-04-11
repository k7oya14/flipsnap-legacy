import React from "react";
import NoLoginHomeGallery from "./NoLoginHomeGallery";
import LoginHomeGallery from "./LoginHomeGallery";
import { auth } from "@/lib/auth";
import { fetchLatestPostsComponent } from "@/lib/fetchWrapper";

const HomeGallery = async () => {
  const session = await auth();
  const { component, cursorId } = await fetchLatestPostsComponent(
    12,
    session?.user.id
  );

  return session ? (
    // <LoginHomeGallery firstPost={component} />
    <p>login user</p>
  ) : (
    <NoLoginHomeGallery firstPost={component} cursorId={cursorId} />
  );
};

export default HomeGallery;
