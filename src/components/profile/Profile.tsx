import React from "react";
import ProfileInformation from "./ProfileInformation";
import { ProfileGallery } from "./ProfileGallery";
import ErrorCard from "../ErrorCard";
import { auth } from "@/lib/auth";
import { fetchUserByUsername } from "@/lib/fetch";

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
        message="ユーザーが見つかりません"
        button="Go back"
        link="/"
      />
    );
  }
  return (
    <>
      <ProfileInformation userInfo={userInfo} me={session?.user} />
      <ProfileGallery userInfo={userInfo} myId={session?.user.id} />;
    </>
  );
};

export default Profile;
