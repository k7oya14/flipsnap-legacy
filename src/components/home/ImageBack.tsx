import Image from "next/image";
import React from "react";
import LockedBack from "../LockedBack";
import { GalleyPost, UserRelationship } from "@/lib/definitions";

type Props = {
  post: GalleyPost;
};

const ImageBack = (props: Props) => {
  const { post } = props;

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
        <LockedBack relationship={UserRelationship.NoSession} />
      </div>
    </div>
  );
};

export default ImageBack;
