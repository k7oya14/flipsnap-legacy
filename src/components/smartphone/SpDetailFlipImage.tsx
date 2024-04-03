"use client";

import React from "react";
import LockedBack from "../LockedBack";
import Image from "next/image";
import ReactFlipCard from "reactjs-flip-card";
import { OnePost } from "@/lib/definitions";

type Props = {
  post: OnePost;
  myId: string;
  hidden: boolean;
};

const SpDetailFlipImage = (props: Props) => {
  const { post, myId, hidden } = props;
  return (
    <ReactFlipCard
      flipTrigger={"onClick"}
      containerStyle={{
        width: "100%",
        height: "auto",
        cursor: "pointer",
      }}
      direction="horizontal"
      frontComponent={
        <Image
          alt=""
          src={post.imgFront!}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "auto",
          }}
          width={500}
          height={500}
        />
      }
      backComponent={
        <div className="overflow-hidden">
          <Image
            alt=""
            src={post.imgBack!}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "auto",
            }}
            className={`${hidden || "filter blur-lg"}`}
            width={500}
            height={500}
          />
          {hidden || (
            <LockedBack
              myId={myId}
              userId={post.authorId}
              relationship={post.author.relationship!}
            />
          )}
        </div>
      }
    />
  );
};

export default SpDetailFlipImage;
