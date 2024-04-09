import { Expand } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import StopPropagationDiv from "../StopPropagationDiv";
import { MotionDiv } from "../MotionDiv";

type Props = {
  index: number;
  src: string;
  postId: string;
};

const ProfileImageFront = (props: Props) => {
  const { index, src, postId } = props;

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group relative rounded-md overflow-hidden hover:cursor-pointer"
    >
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
      <Image
        priority={index < 3}
        alt=""
        className="w-full rounded"
        height="293"
        src={src}
        style={{
          aspectRatio: "293/293",
          objectFit: "cover",
        }}
        width="293"
      />
      <StopPropagationDiv>
        <Link
          className="pl-6 pt-6 pb-2 pr-2 absolute bottom-0 right-0"
          href={`/posts/${postId}`}
          scroll={false}
        >
          <Expand className="visible sm:invisible group-hover:visible h-5 w-5 text-slate-200 hover:scale-110 transition duration-300 ease-in-out" />
        </Link>
      </StopPropagationDiv>
    </MotionDiv>
  );
};

export default ProfileImageFront;
