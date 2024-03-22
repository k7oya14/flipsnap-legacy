import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const ProfileInformation = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Avatar className="w-28 h-28">
        <AvatarImage
          alt="Profile picture"
          src="https://github.com/shadcn.png"
        />
      </Avatar>
      <h2 className="text-2xl font-bold mt-4">akasoeiji</h2>
      <Button className="m-4 rounded-full">フォロー</Button>
      <div className="flex justify-center space-x-4 mt-2">
        <div className="text-center">
          <span className="block font-bold">627件</span>
          <span className="block text-sm">Posts</span>
        </div>
        <div className="text-center">
          <span className="block font-bold">114.8万人</span>
          <span className="block text-sm">Followers</span>
        </div>
        <div className="text-center">
          <span className="block font-bold">328人</span>
          <span className="block text-sm">Following</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="font-medium">@akasoeiji</p>
        <p className="mt-1">デジタルです。</p>
      </div>
    </div>
  );
};

export default ProfileInformation;
