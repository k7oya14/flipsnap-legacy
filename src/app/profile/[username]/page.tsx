import ErrorCard from "@/components/ErrorCard";
import { ProfileGallery } from "@/components/profile/ProfileGallery";
import ProfileInformation from "@/components/profile/ProfileInformation";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { fetchUserByUsername, fetchUserPostsById } from "@/lib/fetch";
import React from "react";

const Page = async ({ params }: { params: { username: string } }) => {
  const username = params.username;
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
  const firstPosts = await fetchUserPostsById(userInfo.id!, 6);

  return (
    <div className="my-1 sm:my-2 max-w-5xl mx-auto">
      <Card className="min-h-screen">
        <ProfileInformation userInfo={userInfo} me={session?.user} />
        <ProfileGallery
          firstPosts={firstPosts}
          userInfo={userInfo}
          myId={session?.user.id}
        />
      </Card>
    </div>
  );
};

export default Page;
