"use client";

import { GalleyPost } from "@/lib/definitions";
import Image from "next/image";
import React from "react";
import ReactFlipCard from "reactjs-flip-card";
import ImageBack from "../home/ImageBack";

type Props = { post: GalleyPost };

const SpFlipImage = (props: Props) => {
  const { post } = props;
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
          src={post.imgFront}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "auto",
          }}
          width={500}
          height={500}
        />
      }
      backComponent={<ImageBack post={post} />}
    />
  );
};

export default SpFlipImage;
