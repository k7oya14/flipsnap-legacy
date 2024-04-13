import Image from "next/image";
import React from "react";
import LockedBack from "../LockedBack";
import { GalleyPost, UserRelationship } from "@/lib/definitions";
import { fetchUserRelationship } from "@/lib/fetch";

type Props = {
  post: GalleyPost;
  myId: string | undefined | null;
};

const ImageBack = async (props: Props) => {
  const { post, myId } = props;
  let relationship = UserRelationship.NoSession;
  if (myId) {
    relationship = await fetchUserRelationship(myId, post.authorId);
  }

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
        <LockedBack relationship={relationship} />
      </div>
    </div>
  );
};

export default ImageBack;
