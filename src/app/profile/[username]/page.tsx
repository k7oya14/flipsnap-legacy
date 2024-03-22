import { ProfileGallery } from "@/components/profile/ProfileGallery";
import ProfileInformation from "@/components/profile/ProfileInformation";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
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
  const firstPosts = await fetchUserPostsById(userInfo.id!, 6);

  return (
    <div className="my-2 max-w-5xl mx-auto">
      <Card className="min-h-screen">
        <ProfileInformation userInfo={userInfo} me={session?.user} />
        <ProfileGallery
          flip={flipCard!}
          firstPosts={firstPosts}
          userInfo={userInfo}
        />
      </Card>
    </div>
  );
};

export default Page;
