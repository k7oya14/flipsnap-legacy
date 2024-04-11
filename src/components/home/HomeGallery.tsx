import React from "react";
import NoLoginHomeGallery from "./NoLoginHomeGallery";
import LoginHomeGallery from "./LoginHomeGallery";
import { auth } from "@/lib/auth";
import { GalleyPost } from "@/lib/definitions";

type Props = { firstPosts: GalleyPost[] };

const HomeGallery = async (props: Props) => {
  const { firstPosts } = props;
  const session = await auth();

  return session ? (
    <LoginHomeGallery firstPost={firstPosts} />
  ) : (
    <NoLoginHomeGallery firstPost={firstPosts} />
  );
};

export default HomeGallery;
