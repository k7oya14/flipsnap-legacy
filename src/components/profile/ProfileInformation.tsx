import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { UserInfo, sessionUser } from "@/lib/definitions";
import FollowStatusButton from "./FollowStatusButton";
import Link from "next/link";

type Props = {
  userInfo: UserInfo;
  me: sessionUser | null | undefined;
};

const ProfileInformation = (props: Props) => {
  const { userInfo, me } = props;
  return (
    <div className="flex flex-col sm:flex-row-reverse items-center justify-center pt-8 pb-3 w-full">
      <div className="sm:w-[30%] sm:ml-20">
        <Avatar className="size-28 sm:size-[95%]">
          <AvatarImage src={userInfo.image!} />
          <AvatarFallback>{userInfo.name}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col items-center sm-[70%]">
        <h2 className="text-2xl sm:text-5xl text-gray-800 font-bold mt-4 sm:mt-0">
          {userInfo.name}
        </h2>
        <p className="font-medium mt-1 sm:mt-2">@{userInfo.username}</p>
        <p className="sm:text-2xl sm:font-semibold text-gray-700 mt-2 sm:mt-1">
          {userInfo.bio}
        </p>
        <div className="flex items-center justify-center space-x-5 mt-2 sm:mt-6 mb-2">
          <div className="text-center">
            <span className="block font-bold">{userInfo._count?.posts}</span>
            <span className="block text-sm">
              &nbsp;&nbsp;&nbsp;&nbsp;Posts&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <Link
            prefetch={true}
            href={`/profile/${userInfo.username}/follower`}
            className="text-center"
          >
            <span className="block font-bold">
              {userInfo._count?.followedBy}
            </span>
            <span className="block text-sm">Followers</span>
          </Link>
          <Link
            prefetch={true}
            href={`/profile/${userInfo.username}/following`}
            className="text-center"
          >
            <span className="block font-bold">
              {userInfo._count?.following}
            </span>
            <span className="block text-sm">Following</span>
          </Link>
        </div>
        <FollowStatusButton
          myId={me?.id!}
          userId={userInfo.id!}
          relationship={userInfo.relationship!}
        />
      </div>
    </div>
  );
};

export default ProfileInformation;
