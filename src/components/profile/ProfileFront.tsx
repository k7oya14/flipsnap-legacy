import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  index: number;
  src: string;
  postId: string;
  handleClick: (id: number) => void;
};

const ProfileFront = (props: Props) => {
  const { index, src, postId, handleClick } = props;

  const handleIconClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: index * 0.2 }}
      onClick={() => handleClick(index)}
      className="group relative rounded-md my-2 overflow-hidden hover:cursor-pointer"
    >
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
      <Image
        alt="Post image"
        className="w-full rounded"
        height="293"
        src={src}
        style={{
          aspectRatio: "293/293",
          objectFit: "cover",
        }}
        width="293"
      />
      <Link
        onClick={(e) => handleIconClick(e)}
        href={`/posts/${postId}`}
        scroll={false}
      >
        <ArrowsPointingOutIcon className="absolute bottom-2 right-2 invisible group-hover:visible h-5 w-5 text-slate-200" />
      </Link>
    </motion.div>
  );
};

export default ProfileFront;
