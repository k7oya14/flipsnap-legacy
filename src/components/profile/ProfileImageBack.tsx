import Image from "next/image";
import React from "react";
import LockedBack from "../LockedBack";
import { UserRelationship } from "@/lib/definitions";

type Props = {
  src: string;
  userId: string;
  myId: string | undefined;
  relationship: UserRelationship;
};

const ProfileImageBack = (props: Props) => {
  const { src, myId, userId, relationship } = props;
  const hidden =
    relationship === UserRelationship.Mutual ||
    relationship === UserRelationship.Me;
  return (
    <div>
      <div className="relative overflow-hidden hover:cursor-pointer rounded-lg ">
        <Image
          alt=""
          className={`w-full rounded ${hidden || "filter blur-lg"}`}
          height="293"
          src={src}
          style={{
            aspectRatio: "293/293",
            objectFit: "cover",
          }}
          width="293"
        />
        {hidden || (
          <LockedBack myId={myId} userId={userId} relationship={relationship} />
        )}
      </div>
    </div>
  );
};

export default ProfileImageBack;
