import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProfileInformationSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Skeleton className="size-28 rounded-full" />
      <Skeleton className="w-28 h-8 mt-4" />
      <Skeleton className="w-24 h-4 mt-2" />
      {/* <Skeleton className="w-3/4 h-2 mt-2" /> */}
      {/* <FollowStatusButton
        myId={me?.id!}
        userId={userInfo.id!}
        relationship={userInfo.relationship!}
      /> */}
      <div className="flex items-center justify-center space-x-5 mt-4">
        <div className="flex flex-col items-center justify-center">
          <Skeleton className="block size-6" />
          <span className="block text-sm">
            &nbsp;&nbsp;&nbsp;&nbsp;Posts&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Skeleton className="block size-6" />
          <span className="block text-sm">Followers</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Skeleton className="block size-6" />
          <span className="block text-sm">Following</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformationSkeleton;
