"use client";

import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Post } from "@/lib/definitions";
import { motion } from "framer-motion";

type Props = {
  index: number;
  post: Post;
  handleClick: (id: string) => void;
};

const ImageFront = (props: Props) => {
  const { index, post, handleClick } = props;

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleIconClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: index * 0.5 }}
    >
      <div
        onClick={() => handleClick(post.id)}
        className="group relative rounded-md my-2 overflow-hidden hover:cursor-pointer"
      >
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        <Image
          width={500}
          height={500}
          priority={true}
          className="rounded-md"
          alt=""
          src={post.imgFront}
        />
        <div className="absolute inset-x-0 bottom-0 h-full w-full hover:bg-gradient-to-b from-transparent to-zinc-800 rounded-b">
          <Link
            href={`/profile/${post.author?.username}`}
            onClick={(e) => handleIconClick(e)}
            className="absolute bottom-2 left-2 invisible group-hover:visible flex items-center space-x-2 text-slate-200"
          >
            <Avatar>
              <AvatarImage src={post.author?.image!} />
              <AvatarFallback>{post.author?.name}</AvatarFallback>
            </Avatar>
            <p className="text-lg">{post.author?.name}</p>
          </Link>
          <Link
            onClick={(e) => handleIconClick(e)}
            href={`/posts/${post.id}`}
            scroll={false}
          >
            <ArrowsPointingOutIcon className="absolute bottom-2 right-2 invisible group-hover:visible h-5 w-5 text-slate-200" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageFront;
