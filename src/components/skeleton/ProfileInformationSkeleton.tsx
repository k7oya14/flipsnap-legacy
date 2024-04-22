import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProfileInformationSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row-reverse items-center justify-center sm:pt-8 py-3 pb-4 sm:pb-0 w-full">
      <div className="sm:w-[30%]">
        <Skeleton className="size-28 sm:size-[95%] sm:aspect-square rounded-full" />
      </div>
      <div className="flex flex-col items-center sm:w-[50%]">
        <Skeleton className="w-28 sm:w-72 h-8 sm:h-12 mt-4 sm:mt-0" />
        <Skeleton className="w-24 h-4 mt-1 sm:mt-2" />
        <Skeleton className="w-32 sm:w-72 h-4 sm:h-6 mt-3 mb-2" />
        <div className="flex items-center justify-center space-x-5 mt-2 sm:mt-6 pb-12">
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
    </div>
  );
};

export default ProfileInformationSkeleton;
