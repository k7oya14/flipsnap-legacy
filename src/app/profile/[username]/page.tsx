import ProfileInformation from "@/components/profile/ProfileInformation";
import { Profile } from "@/components/profile/profile";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { fetchUserByUsername } from "@/lib/fetch";
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

  return (
    <div className="my-2 max-w-5xl mx-auto">
      <Card>
        <ProfileInformation userInfo={userInfo} />
        <Profile flip={flipCard!} />
      </Card>
    </div>
  );
};

export default Page;
