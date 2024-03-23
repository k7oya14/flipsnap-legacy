import { EyeOff } from "lucide-react";
import React from "react";
import { UserRelationship } from "@/lib/definitions";
import BackFollowButton from "./BackFollowButton";

type Props = {
  myId: string | undefined;
  userId: string;
  relationship: UserRelationship;
};

const LockedBack = (props: Props) => {
  const { myId, userId, relationship } = props;
  return (
    <div className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-b from-transparent to-black rounded-b">
      <div className="absolute  flex flex-col justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <EyeOff className="h-10 w-10 left-1/2 text-white" />
        <BackFollowButton
          myId={myId}
          userId={userId}
          relationship={relationship}
        />
      </div>
    </div>
  );
};

export default LockedBack;
