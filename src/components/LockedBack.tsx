import { EyeSlashIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Button } from "./ui/button";

const LockedBack = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-b from-transparent to-black rounded-b">
      <div className="absolute  flex flex-col justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <EyeSlashIcon className="h-10 w-10 left-1/2 text-white" />
        <p className="text-white text-center">You have to follow</p>
        <Button className="mt-2 bg-white hover:bg-slate-100 rounded-full text-black font-bold">
          Follow
        </Button>
      </div>
    </div>
  );
};

export default LockedBack;
