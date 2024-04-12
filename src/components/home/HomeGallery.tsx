import React from "react";
import NoLoginHomeGallery from "./NoLoginHomeGallery";
import { auth } from "@/lib/auth";
import { fetchLatestPostsComponent } from "@/lib/fetchWrapper";

const HomeGallery = async () => {
  const session = await auth();
  const { component, cursorId } = await fetchLatestPostsComponent(
    12,
    session?.user.id
  );

  return <NoLoginHomeGallery firstPost={component} cursorId={cursorId} />;
};

export default HomeGallery;
