import React from "react";
import Image from "next/image";
import LockedBack from "../LockedBack";
import { UserRelationship } from "@/lib/definitions";

type Props = {
  src: string;
  myId: string | undefined;
  userId: string;
  relationship: UserRelationship;
};

const DetailImageBack = async (props: Props) => {
  const { src, myId, userId, relationship } = props;
  const hidden =
    relationship === UserRelationship.Mutual ||
    relationship === UserRelationship.Me;

  return (
    <div className="text-center h-full">
      <div className="relative overflow-hidden h-full inline-block">
        <Image
          alt=""
          width={500}
          height={500}
          className={`object-contain h-full w-auto ${
            hidden || "filter blur-lg"
          }`}
          src={src}
        />
        {hidden || (
          <LockedBack myId={myId} userId={userId} relationship={relationship} />
        )}
      </div>
    </div>
  );
};

export default DetailImageBack;
