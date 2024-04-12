import React, { Suspense } from "react";
import FlipImage from "../FlipImage";
import ImageFront from "./ImageFront";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import ImageBack from "./ImageBack";
import { GalleyPost } from "@/lib/definitions";

type Props = { post: GalleyPost; index: number; session: boolean };

const HomePost = (props: Props) => {
  const { post, index, session } = props;
  return (
    <FlipImage
      key={post.id}
      containerStyle={{
        width: "100%",
        height: "auto",
        marginBottom: "8px",
      }}
      frontComponent={<ImageFront index={index} post={post} />}
      backComponent={
        <Suspense
          fallback={
            <>
              <Image
                alt=""
                src={post.imgFront}
                width={500}
                height={500}
                className="relative rounded-lg opacity-0"
              />
              <Skeleton className="absolute inset-0 rounded-lg w-full h-auto" />
            </>
          }
        >
          <ImageBack post={post} session={session} />
        </Suspense>
      }
    />
  );
};

export default HomePost;
