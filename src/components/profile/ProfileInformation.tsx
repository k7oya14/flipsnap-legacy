import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { UserInfo, sessionUser } from "@/lib/definitions";
import FollowStatusButton from "../FollowStatusButton";
import Link from "next/link";

type Props = {
  userInfo: UserInfo;
  me: sessionUser | null | undefined;
};

const ProfileInformation = (props: Props) => {
  const { userInfo, me } = props;
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Avatar className="w-28 h-28">
        <AvatarImage alt={userInfo.username!} src={userInfo.image!} />
      </Avatar>
      <h2 className="text-2xl font-bold mt-4">{userInfo.name}</h2>
      <p className="font-medium mt-1">@{userInfo.username}</p>
      <p className="mt-2">{userInfo.bio}</p>
      <FollowStatusButton
        myId={me?.id!}
        userId={userInfo.id!}
        relationship={userInfo.relationship!}
      />
      <div className="flex items-center justify-center space-x-5 mt-2">
        <div className="text-center">
          <span className="block font-bold">{userInfo._count?.posts}</span>
          <span className="block text-sm">
            &nbsp;&nbsp;&nbsp;&nbsp;Posts&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
        <Link
          href={`/profile/${userInfo.username}/follower`}
          className="text-center"
        >
          <span className="block font-bold">{userInfo._count?.followers}</span>
          <span className="block text-sm">Followers</span>
        </Link>
        <Link
          href={`/profile/${userInfo.username}/following`}
          className="text-center"
        >
          <span className="block font-bold">{userInfo._count?.follows}</span>
          <span className="block text-sm">Following</span>
        </Link>
      </div>
    </div>
  );
};

export default ProfileInformation;
