import React, { ReactNode } from "react";
import NoLoginHomeGallery from "./NoLoginHomeGallery";
import LoginHomeGallery from "./LoginHomeGallery";
import { auth } from "@/lib/auth";
import { GalleyPost } from "@/lib/definitions";

// type Props = { firstPosts: GalleyPost[] };
type Props = { firstPosts: ReactNode[]; cursorId: string };

const HomeGallery = async (props: Props) => {
  const { firstPosts, cursorId } = props;
  const session = await auth();

  return session ? (
    <LoginHomeGallery firstPost={firstPosts} />
  ) : (
    <NoLoginHomeGallery firstPost={firstPosts} cursorId={cursorId} />
  );
};

export default HomeGallery;
