import ErrorCard from "@/components/ErrorCard";
import { ProfileGallery } from "@/components/profile/ProfileGallery";
import ProfileInformation from "@/components/profile/ProfileInformation";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { UserRelationship } from "@/lib/definitions";
import { fetchUserByUsername, fetchUserPostsById } from "@/lib/fetch";
import React from "react";

type PageProps = {
  params: {
    username: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
};

const Page = async (props: PageProps) => {
  const { params, searchParams } = props;
  const username = params.username;
  const flipCard = searchParams["flip"];
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
          flip={flipCard!}
          firstPosts={firstPosts}
          userInfo={userInfo}
          myId={session?.user.id}
        />
      </Card>
    </div>
  );
};

export default Page;
