"use client";

import React from "react";
import Image from "next/image";
import LockedBack from "../LockedBack";
import { UserRelationship } from "@/lib/definitions";

type Props = {
  src: string;
  myId: string | undefined;
  userId: string;
  relationship: UserRelationship;
  handleClick: () => void;
};

const DetailBack = (props: Props) => {
  const { src, myId, userId, relationship, handleClick } = props;
  const hidden =
    relationship === UserRelationship.Mutual || UserRelationship.Me;

  return (
    <div>
      <div
        onClick={handleClick}
        className="relative border-2 border-slate-200 rounded-md my-2 hover:cursor-pointer"
      >
        <Image
          alt=""
          className={`h-auto rounded ${hidden || "filter blur-lg"}`}
          height="758"
          src={src}
          style={{
            aspectRatio: "902/758",
            objectFit: "cover",
          }}
          width="902"
        />
        {hidden || (
          <LockedBack myId={myId} userId={userId} relationship={relationship} />
        )}
      </div>
    </div>
  );
};

export default DetailBack;
