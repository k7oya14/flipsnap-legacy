import React from "react";
import { fetchLatestPostsComponent } from "@/lib/fetchWrapper";
import HomeGallery from "./HomeGallery";

type Props = {
  myId: string | undefined;
};

const HomeGalleryFetch = async (props: Props) => {
  const { myId } = props;
  const { component, cursorId } = await fetchLatestPostsComponent(12, myId);
  const firstPosts: React.ReactNode[][] = [[], [], []];
  component.forEach((post, i) => {
    firstPosts[i % 3] = [...firstPosts[i % 3], post];
  });

  return <HomeGallery firstPosts={firstPosts} cursorId={cursorId} />;
};

export default HomeGalleryFetch;
