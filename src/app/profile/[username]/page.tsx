import ProfileInformation from "@/components/profile/ProfileInformation";
import { Profile } from "@/components/profile/profile";
import { Card } from "@/components/ui/card";
import React from "react";

type PageProps = {
  params: {
    username: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
};

const Page = (props: PageProps) => {
  const { params, searchParams } = props;
  const username = params.username;
  const flipCard = searchParams["flip"];

  return (
    <div className="my-2 max-w-5xl mx-auto">
      <Card>
        <ProfileInformation />
        <Profile flip={flipCard!} />
      </Card>
    </div>
  );
};

export default Page;
