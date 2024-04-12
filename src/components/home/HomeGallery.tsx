import React from "react";
import NoLoginHomeGallery from "./NoLoginHomeGallery";
import { fetchLatestPostsComponent } from "@/lib/fetchWrapper";

type Props = {
  myId: string | undefined;
};

const HomeGallery = async (props: Props) => {
  const { myId } = props;
  const { component, cursorId } = await fetchLatestPostsComponent(12, myId);

  return <NoLoginHomeGallery firstPost={component} cursorId={cursorId} />;
};

export default HomeGallery;
