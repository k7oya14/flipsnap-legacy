import React from "react";
import { Skeleton } from "../ui/skeleton";
import { BookmarkIcon, HeartIcon, ReplyIcon, SendIcon } from "lucide-react";

const SpHomeSkeleton = () => {
  return [...Array(2)].map((_, i) => (
    <div
      key={i}
      className="w-full h-full flex flex-col min-w-[360px] max-w-[960px] border-b-2"
    >
      <div className="pl-3 pt-3 flex items-center hover:cursor-pointer">
        <Skeleton className="rounded-full w-10 h-10" />
        <div className="ml-3">
          <Skeleton className="w-[30vw] h-[20px]" />
          <Skeleton className="ml-1 mt-1 w-[25vw] h-3" />
        </div>
      </div>
      <main className="flex-grow overflow-y-auto">
        <div className="flex flex-col gap-4 pt-2 pb-4">
          <Skeleton className="w-full h-[60vh] rounded-none" />
          <div className="px-4 gap-2 flex flex-col">
            <div className="flex items-center gap-2">
              <button className="focus:outline-none">
                <HeartIcon className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer" />
              </button>
              <button className="focus:outline-none">
                <ReplyIcon className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer" />
              </button>
              <button className="focus:outline-none">
                <SendIcon className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer" />
              </button>
              <button className="focus:outline-none ml-auto">
                <BookmarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer" />
              </button>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-3 w-[35%]" />
          </div>
        </div>
      </main>
    </div>
  ));
};

export default SpHomeSkeleton;
