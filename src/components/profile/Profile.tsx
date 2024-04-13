import React, { Suspense } from "react";
import ProfileInformation from "./ProfileInformation";
import { ProfileGallery } from "./ProfileGallery";
import ErrorCard from "../ErrorCard";
import { auth } from "@/lib/auth";
import { fetchUserByUsername } from "@/lib/fetch";
import ProfileGallerySkeleton from "../skeleton/ProfileGallerySkeleton";

type Props = {
  username: string;
};

const Profile = async (props: Props) => {
  const { username } = props;
  const session = await auth();
  const userInfo = await fetchUserByUsername(username, session?.user.id);
  if (!userInfo.id) {
    return (
      <ErrorCard
        heading="User not found"
        message="お探しのユーザーが見つかりませんでした"
        button="Go Home"
        link="/"
      />
    );
  }
  return (
    <>
      <ProfileInformation userInfo={userInfo} me={session?.user} />
      <Suspense fallback={<ProfileGallerySkeleton />}>
        <ProfileGallery userInfo={userInfo} myId={session?.user.id} />
      </Suspense>
    </>
  );
};

export default Profile;
