import { LockClosedIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import LockedBack from "../LockedBack";
import { UserRelationship } from "@/lib/definitions";

type Props = {
  src: string;
  userId: string;
  myId: string | undefined;
  relationship: UserRelationship;
  handleClick: () => void;
};

const ProfileBack = (props: Props) => {
  const { src, myId, userId, relationship, handleClick } = props;
  return (
    <div>
      <div
        onClick={handleClick}
        className="relative hover:cursor-pointer rounded-lg border-[3px] border-gray-200 "
      >
        <Image
          alt="Post image"
          className={`w-full rounded ${
            relationship === UserRelationship.Mutual || "filter blur-lg"
          }`}
          height="293"
          src={src}
          style={{
            aspectRatio: "293/293",
            objectFit: "cover",
          }}
          width="293"
        />
        {relationship === UserRelationship.Mutual || (
          <LockedBack myId={myId} userId={userId} relationship={relationship} />
        )}
      </div>
    </div>
  );
};

export default ProfileBack;
