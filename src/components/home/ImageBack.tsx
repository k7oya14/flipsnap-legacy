import Image from "next/image";
import React from "react";
import LockedBack from "../LockedBack";
import { GalleyPost, UserRelationship } from "@/lib/definitions";

type Props = {
  post: GalleyPost;
  myId: string | undefined | null;
  relationship: UserRelationship;
  loading?: boolean;
};

const ImageBack = (props: Props) => {
  const { post, myId, relationship, loading = false } = props;

  return (
    <div>
      <div className="overflow-hidden w-full h-auto hover:cursor-pointer sm:rounded-lg ">
        <Image
          width={500}
          height={500}
          className={`rounded-md filter blur-lg relative`}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "auto",
          }}
          alt=""
          src={post.imgBack}
        />
        <LockedBack
          myId={myId}
          userId={post.authorId}
          relationship={relationship}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ImageBack;
