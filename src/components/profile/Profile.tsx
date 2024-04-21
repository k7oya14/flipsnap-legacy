import React, { Suspense } from "react";
import ProfileInformation from "./ProfileInformation";
import { ProfileGallery } from "./ProfileGallery";
import ErrorCard from "../ErrorCard";
import { auth } from "@/lib/auth";
import { fetchUserByUsername, fetchUserRelationship } from "@/lib/fetch";
import ProfileGallerySkeleton from "../skeleton/ProfileGallerySkeleton";
import { UserRelationship } from "@/lib/definitions";

type Props = {
  username: string;
};

const Profile = async (props: Props) => {
  const { username } = props;
  const userInfo = await fetchUserByUsername(username);
  if (!userInfo?.id) {
    return (
      <ErrorCard
        heading="User not found"
        message="お探しのユーザーが見つかりませんでした"
        button="Go Home"
        link="/"
      />
    );
  }
  const session = await auth();
  let relationship = UserRelationship.NoSession;
  if (session) {
    relationship = await fetchUserRelationship(session?.user.id, userInfo.id);
  }
  return (
    <>
      <ProfileInformation
        userInfo={userInfo}
        myId={session?.user.id}
        relationship={relationship}
      />
      <Suspense fallback={<ProfileGallerySkeleton />}>
        <ProfileGallery
          userInfo={userInfo}
          myId={session?.user.id}
          relationship={relationship}
        />
      </Suspense>
    </>
  );
};

export default Profile;
