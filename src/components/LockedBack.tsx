import { EyeOff } from "lucide-react";
import React from "react";
import { UserRelationship } from "@/lib/definitions";
import BackFollowButton from "./BackFollowButton";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  myId?: string | undefined;
  userId?: string | undefined;
  relationship: UserRelationship;
};

const LockedBack = (props: Props) => {
  const { myId = undefined, userId, relationship } = props;
  return (
    <div className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-b from-transparent to-black rounded-t rounded-b">
      <div className="absolute flex flex-col justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <EyeOff className="h-10 w-10 left-1/2 text-white" />
        {relationship === UserRelationship.NoSession ? (
          <div className="my-2 flex flex-col justify-center">
            <p className="whitespace-nowrap text-lg text-white text-center">
              You have to sign in
            </p>
            <Link
              onClick={(e) => e.stopPropagation()}
              href="/api/auth/signin"
              className="mx-auto"
            >
              <Button className="mt-2 bg-white hover:bg-slate-100 rounded-full text-black font-bold max-w-fit">
                Sign in
              </Button>
            </Link>
          </div>
        ) : (
          <BackFollowButton
            myId={myId}
            userId={userId}
            relationship={relationship}
          />
        )}
      </div>
    </div>
  );
};

export default LockedBack;
